import React, { useState } from "react";
import { Button, Grid, Link, Paper, TextField, Typography } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

function SignupPage() {
  const { signUpAuthError, loading, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div className="login-signup-container">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item lg={4} sm={10} xs={12}>
          <Paper elevation={3} className="paper">
            <Grid container spacing={4} justify="center">
              <Grid item xs={10}>
                <Typography variant="h4" align="center">
                  Sign up
                </Typography>
              </Grid>
              {signUpAuthError ? (
                <Grid item xs={10}>
                  <div className="survey-error">
                    <Typography variant="h5" align="center" color="error">
                      {signUpAuthError}
                    </Typography>
                  </div>
                </Grid>
              ) : null}
              <Grid item xs={10}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  label="Password confirmation"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <Button
                  disabled={loading}
                  onClick={() => signUp(name, email, password, passwordConfirmation)}
                  variant="contained"
                  color="primary"
                  fullWidth>
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Typography align="center">
                  <Link href="/login">Already have an account? Log in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupPage;
