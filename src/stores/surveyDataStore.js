import { makeAutoObservable, runInAction } from "mobx";

class SurveysStore {
  data = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getAllSurveysFromServer() {
    try {
      this.loading = true;
      const response = await fetch("https://myreactapp.site/api/surveys", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const allSurveysData = await response.json();
        runInAction(() => {
          this.data = allSurveysData;
        });
      }
      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error(error);
    }
  }

  async sendSurveyToServer(surveyDataObject) {
    try {
      await fetch("https://myreactapp.site/api/surveys", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(surveyDataObject),
      });
      this.getAllSurveysFromServer();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSurveyFromServer(surveyId) {
    try {
      await fetch(
        `https://myreactapp.site/api/surveys/${surveyId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      this.getAllSurveysFromServer();
    } catch (error) {
      console.error(error);
    }
  }
}

export default new SurveysStore();
