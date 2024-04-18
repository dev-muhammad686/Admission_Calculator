import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "50%",
    margin: "0 auto",
  },
}));

function App() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    gpa: null,
    graduationYear: null,
    universityType: null,
    satScore: null,
  });

  const [errors, setErrors] = useState({});
  const [resultMessage, setResultMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? "" : "This field is required.";
    temp.email = formData.email ? "" : "This field is required.";
    temp.gpa = formData.gpa ? "" : "This field is required.";
    temp.graduationYear = formData.graduationYear
      ? ""
      : "This field is required.";
    temp.universityType = formData.universityType
      ? ""
      : "This field is required.";
    temp.satScore = formData.satScore ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (formData.gpa >= 3.9 && formData.satScore >= 1550) {
        setResultMessage(
          "Great! You have a good chance of getting into an Ivy League school."
        );
      } else if (
        formData.gpa >= 3.75 &&
        formData.gpa < 3.9 &&
        formData.satScore >= 1550
      ) {
        setResultMessage(
          "Good. Consider a hook project to increase your chances."
        );
      } else if (formData.gpa < 3.75 && formData.satScore >= 1570) {
        setResultMessage(
          "It will be difficult based on your GPA, but your high SAT score and a hook project could help. Contact us for a free call to discuss your options."
        );
      } else if (formData.gpa < 3.75 && formData.satScore < 1570) {
        setResultMessage(
          "It will be very difficult for you to get accepted based on your GPA and SAT score. Our best advice is to get a 1570+ SAT and do a very impressive hook project. Contact us for a free call to discuss your options."
        );
      } else {
        setResultMessage(
          "Your GPA or SAT score does not meet the minimum requirements."
        );
      }
    }
  };

  return (
    <>
      <div className={`App ${classes.formContainer}`}>
        <Typography variant="h4" component="h1" gutterBottom>
          Evaluate Your Academic Performance
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gpa"
                label="GPA"
                onChange={handleChange}
                error={Boolean(errors.gpa)}
                helperText={errors.gpa}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="graduationYear"
                label="Graduation Year"
                onChange={handleChange}
                error={Boolean(errors.graduationYear)}
                helperText={errors.graduationYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="universityType-label">
                  University Type
                </InputLabel>
                <Select
                  name="universityType"
                  labelId="universityType-label"
                  onChange={handleChange}
                  error={Boolean(errors.universityType)}
                >
                  <MenuItem value="Option A">Option A</MenuItem>
                  <MenuItem value="Option B">Option B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="satScore"
                label="SAT Score"
                onChange={handleChange}
                error={Boolean(errors.satScore)}
                helperText={errors.satScore}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box
        className={classes.formContainer}
        mt={5}
        p={2}
        boxShadow={3}
        borderRadius={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Result
            </Typography>
            {resultMessage && <p>{resultMessage}</p>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
