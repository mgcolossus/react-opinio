const express = require("express");
const validateSurvey = require("../middleware/validateSurvey");
const checkAuthenticated = require("../middleware/checkAuthenticated");
const DbInterface = require("../database");
const router = express.Router();
const uuidv4 = require("uuid").v4;
const validatePassedSurvey = require("../validators/validatePassedSurvey");
const getStatsFromPassedSurveysData = require("../getStatsFromPassedSurveysData");

router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const allSurveysData = await DbInterface.getAllSurveys(req.user.id);
    res.status(200).send(allSurveysData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.post("/", checkAuthenticated, validateSurvey, async (req, res) => {
  try {
    function replaceAllIds(surveyData) {
      surveyData.elementId = uuidv4();
      surveyData.elements = surveyData.elements.map((element) => {
        return {
          ...element,
          elementId: uuidv4(),
        };
      });
    }

    const surveyData = req.validatedBody;
    replaceAllIds(surveyData);
    await DbInterface.addSurveyToDatabase(req.user.id, surveyData.surveyId, surveyData);
    res.status(200).send("Survey added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.delete("/:surveyId", checkAuthenticated, async (req, res) => {
  try {
    const deletedSurveyData = await DbInterface.deleteSurvey(req.user.id, req.params.surveyId);
    if (!deletedSurveyData) {
      return res.status(422).send("The survey does not belong to the user you are logged in");
    }
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.get("/stats/:surveyId", checkAuthenticated, async (req, res) => {
  try {
    const exists = await DbInterface.doesSurveyExist(req.params.surveyId);
    if (!exists) {
      return res.status(404).send("No survey found");
    }
    const belongsToUser = await DbInterface.doesSurveyBelongsToUser(req.user.id, req.params.surveyId);
    if (!belongsToUser) {
      return res.status(404).send("The survey doesn't belong to the user you're logged in");
    }
    const surveyElementsProperties = await DbInterface.getSurveyElementsIdsWithProperties(req.params.surveyId);
    const passedSurveysData = await DbInterface.getPassedSurveyAnswersById(req.params.surveyId);
    const stats = getStatsFromPassedSurveysData(passedSurveysData, surveyElementsProperties);
    res.status(200).send(stats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.get("/link/:surveyId", checkAuthenticated, async (req, res) => {
  try {
    const belongs = await DbInterface.doesSurveyBelongsToUser(req.user.id, req.params.surveyId);
    if (!belongs) {
      return res.status(404).send("Survey doesn't belong to the user you're logged in");
    }
    const surveyLinkToken = await DbInterface.getSurveyLinkToken(req.user.id, req.params.surveyId);
    const link = `http://localhost:3000/forms/${surveyLinkToken}`;
    res.status(200).send(link);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.get("/form/:linkToken", async (req, res) => {
  try {
    const surveyData = await DbInterface.getSurveyDataByLinkToken(req.params.linkToken);
    if (surveyData == null) {
      return res.status(404).send("No survey found with a given token");
    }
    res.status(200).send(surveyData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.post("/form/:linkToken", async (req, res) => {
  try {
    const linkToken = req.params.linkToken;
    const surveyId = await DbInterface.getSurveyIdByLinkToken(linkToken);
    if (surveyId) {
      const elementsProperties = await DbInterface.getSurveyElementsIdsWithProperties(surveyId);
      if (elementsProperties) {
        const { value, error } = validatePassedSurvey(req.body, elementsProperties);
        if (error) {
          return res.status(422).send("Invalid data");
        }
        await DbInterface.addPassedSurveyToDatabase(surveyId, value);
        res.status(200).send("ok");
      } else {
        res.status(500).send("Internal error");
      }
    } else {
      res.status(404).send("No survey found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

router.get("/link/recreate/:surveyId", checkAuthenticated, async (req, res) => {
  try {
    const belongs = await DbInterface.doesSurveyBelongsToUser(req.user.id, req.params.surveyId);
    if (!belongs) {
      return res.status(404).send("Survey doesn't belong to the user you're logged in");
    }
    const surveyLinkToken = await DbInterface.recreateSurveyLinkToken(req.user.id, req.params.surveyId);
    const link = `http://localhost:3000/forms/${surveyLinkToken}`;
    res.status(200).send(link);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

module.exports = router;
