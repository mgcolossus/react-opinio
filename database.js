const db = require("./pgPool");
const uuidv4 = require("uuid").v4;

class DbInterface {
  async addUserToDatabase(id, name, email, password) {
    try {
      const queryResult = await db.query(
        `INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [id, name, email, password]
      );
      return queryResult.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const data = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
      const user = data.rows[0];
      if (user) {
        return {
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
          password: user.user_password,
        };
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const queryResult = await db.query(`SELECT * FROM users WHERE user_email = $1`, [email]);
      const user = queryResult.rows[0];
      if (user) {
        return {
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
          password: user.user_password,
        };
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllSurveys(userId) {
    try {
      const queryResult = await db.query(
        `SELECT survey_data FROM surveys WHERE user_id = $1 ORDER BY survey_data->>'title' ASC;`,
        [userId]
      );
      let data = queryResult.rows;
      data = data.map((tableRow) => tableRow.survey_data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addSurveyToDatabase(userId, surveyId, surveyData) {
    try {
      const queryResult = await db.query(
        `INSERT INTO surveys (survey_id, user_id, survey_data, created_tstz) VALUES ($1, $2, $3, now()) RETURNING *`,
        [surveyId, userId, JSON.stringify(surveyData)]
      );
      return queryResult.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteSurvey(userId, surveyId) {
    try {
      const queryResult = await db.query("DELETE FROM surveys WHERE user_id=$1 AND survey_id = $2 RETURNING *", [
        userId,
        surveyId,
      ]);
      return queryResult.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async recreateSurveyLinkToken(userId, surveyId) {
    try {
      const newLinkToken = await db.query(
        "UPDATE surveys SET survey_token_for_link=$1 WHERE user_id=$2 AND survey_id = $3 returning survey_token_for_link",
        [uuidv4(), userId, surveyId]
      );
      return newLinkToken.rows[0].survey_token_for_link;
    } catch (error) {
      throw error;
    }
  }

  async getSurveyLinkToken(userId, surveyId) {
    try {
      const queryResult = await db.query(
        `SELECT survey_token_for_link FROM surveys WHERE user_id=$1 AND survey_id = $2`,
        [userId, surveyId]
      );
      if (queryResult.rows[0].survey_token_for_link == null) {
        return await this.recreateSurveyLinkToken(userId, surveyId);
      } else {
        return queryResult.rows[0].survey_token_for_link;
      }
    } catch (error) {
      throw error;
    }
  }

  async doesSurveyBelongsToUser(userId, surveyId) {
    try {
      const queryResult = await db.query(`select from surveys where user_id=$1 and survey_id=$2`, [userId, surveyId]);
      if (queryResult.rows.length === 0) {
        return false;
      } else if (queryResult.rows.length === 1) {
        return true;
      } else {
        throw Error("A few surveys with the same Id");
      }
    } catch (error) {
      throw error;
    }
  }

  async doesSurveyExist(surveyId) {
    try {
      const queryResult = await db.query(`select from surveys where survey_id=$1`, [surveyId]);
      if (queryResult.rows.length === 0) {
        return false;
      } else if (queryResult.rows.length === 1) {
        return true;
      } else {
        throw Error("There are a few surveys with the same Id");
      }
    } catch (error) {
      throw error;
    }
  }

  async getSurveyDataByLinkToken(token) {
    try {
      const queryResult = await db.query(`SELECT survey_data FROM surveys WHERE survey_token_for_link = $1;`, [token]);
      if (queryResult.rows.length === 1) {
        const data = queryResult.rows[0].survey_data;
        return data;
      } else if (queryResult.rows.length > 1) {
        throw Error("Token belongs to more than one survey");
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getSurveyIdByLinkToken(token) {
    try {
      const queryResult = await db.query(`SELECT survey_id FROM surveys WHERE survey_token_for_link = $1;`, [token]);
      if (queryResult.rows.length === 1) {
        const data = queryResult.rows[0].survey_id;
        return data;
      } else if (queryResult.rows.length > 1) {
        throw Error("Token belongs to more than one survey");
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getSurveyDataBySurveyId(surveyId) {
    try {
      const queryResult = await db.query(`SELECT survey_data FROM surveys WHERE survey_id = $1;`, [surveyId]);
      if (queryResult.rows.length === 1) {
        const data = queryResult.rows[0].survey_data;
        return data;
      } else if (queryResult.rows.length > 1) {
        throw Error("SurveyId belongs to more than one survey");
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getSurveyElementsIdsWithProperties(surveyId) {
    try {
      const data = await this.getSurveyDataBySurveyId(surveyId);
      const elementsData = {};
      data.elements.forEach((el) => {
        const elementProperties = {};
        elementProperties.question = el.question;
        elementProperties.type = el.type;
        elementProperties.required = el.required;
        elementProperties.otherOptionAllowed = el.otherOptionAllowed || false;
        if (el.type === "oneSelection" || el.type === "manySelections") {
          elementProperties.options = el.options;
        }
        elementsData[el.elementId] = elementProperties;
      });
      return elementsData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addPassedSurveyToDatabase(surveyId, data) {
    try {
      await db.query(
        "INSERT INTO passed_surveys (passed_survey_id, source_survey_id, passed_survey_data, passed_tstz) VALUES ($1, $2, $3, now())",
        [uuidv4(), surveyId, JSON.stringify(data)]
      );
    } catch (error) {
      throw error;
    }
  }

  async getPassedSurveyAnswersById(surveyId) {
    try {
      const queryResult = await db.query("SELECT passed_survey_data FROM passed_surveys WHERE source_survey_id=$1;", [
        surveyId,
      ]);
      const extractedData = queryResult.rows.map(row => {
        return row.passed_survey_data;
      })
      return extractedData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DbInterface();

