import React, { useState } from "react";
import { Paper, Grid, TextField, Button, Typography, Link, CircularProgress } from "@material-ui/core";

import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const { logInWithEmailAndPassword, logInAuthError, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-signup-container">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item lg={4} sm={10} xs={12}>
          <Paper elevation={3} className="paper">
            <Grid container spacing={4} justify="center">
              <Grid item xs={10}>
                <Typography variant="h4" align="center">
                  Log in
                </Typography>
              </Grid>
              {loading ? (
                <Grid item xs={10}>
                  <div className="progress-circle-wrapper">
                    <CircularProgress />
                  </div>
                </Grid>
              ) : (
                <>
                  {logInAuthError ? (
                    <Grid item xs={10}>
                      <div className="survey-error">
                        <Typography variant="h5" align="center" color="error">
                          {logInAuthError}
                        </Typography>
                      </div>
                    </Grid>
                  ) : null}
                  <Grid item xs={10}>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      label="Email"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          logInWithEmailAndPassword(email, password);
                        }
                      }}
                      type="password"
                      label="Password"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Button
                      disabled={loading}
                      onClick={() => logInWithEmailAndPassword(email, password)}
                      variant="contained"
                      color="primary"
                      fullWidth>
                      Log in
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <Button
                      onClick={() => logInWithEmailAndPassword("jake@jake.com", "123123")}
                      variant="contained"
                      color="primary"
                      fullWidth>
                      Войти в тестовый аккаунт
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography align="center">
                      <Link href="/signup">Don't have an account? Sign up</Link>
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
