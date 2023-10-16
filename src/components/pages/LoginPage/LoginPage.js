import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as loginActions from "./../../../actions/login.action";
import * as companyActions from "./../../../actions/company.action";
// import LinkPDF from "./../../../../src/doc";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 440,
  },
  media: {
    height: 290,
    backgroundSize: "auto",
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const companyReducer = useSelector(({ companyReducer }) => companyReducer);
  const [company, setCompany] = useState("");

  useEffect(() => {
    dispatch(companyActions.getCompanys());
  }, []);

  const companys = useMemo(() =>
    companyReducer.result ? companyReducer.result : []
  );

  // const companys = [
  //   {
  //     ID: 1,
  //     CCCONO: 10,
  //     CCDIVI: "101",
  //     CCCONM: "บริษัท บางกอกแร้นช์ จำกัด (มหาชน) ",
  //     COMPANY: '"10 : 101 : บริษัท บางกอกแร้นช์ จำกัด (มหาชน)"',
  //   },
  //   {
  //     ID: 2,
  //     CCCONO: 100,
  //     CCDIVI: "110",
  //     CCCONM: "บริษัท อนาทิส ฟู๊ดส์ จำกัด ",
  //     COMPANY: '"100 : 110 : บริษัท อนาทิส ฟู๊ดส์ จำกัด"',
  //   },
  //   {
  //     ID: 3,
  //     CCCONO: 100,
  //     CCDIVI: "120",
  //     CCCONM: "ANATIS FOODS LIMITED (HK) ",
  //     COMPANY: '"100 : 120 : ANATIS FOODS LIMITED (HK)"',
  //   },
  //   {
  //     ID: 4,
  //     CCCONO: 100,
  //     CCDIVI: "130",
  //     CCCONM: "ANATIS FOODS LIMITED (SG) ",
  //     COMPANY: '"100 : 130 : ANATIS FOODS LIMITED (SG)"',
  //   },
  //   {
  //     ID: 5,
  //     CCCONO: 200,
  //     CCDIVI: "200",
  //     CCCONM: "บริษัท บีอาร์ การเกษตร จำกัด ",
  //     COMPANY: '"200 : 200 : บริษัท บีอาร์ การเกษตร จำกัด"',
  //   },
  //   {
  //     ID: 6,
  //     CCCONO: 300,
  //     CCDIVI: "300",
  //     CCCONM: "บริษัท บีเอ็ม การเกษตร จำกัด ",
  //     COMPANY: '"300 : 300 : บริษัท บีเอ็ม การเกษตร จำกัด"',
  //   },
  //   {
  //     ID: 7,
  //     CCCONO: 400,
  //     CCDIVI: "400",
  //     CCCONM: "บริษัท ฟู้ด ซิตี้ จำกัด ",
  //     COMPANY: '"400 : 400 : บริษัท ฟู้ด ซิตี้ จำกัด"',
  //   },
  //   {
  //     ID: 8,
  //     CCCONO: 500,
  //     CCDIVI: "500",
  //     CCCONM: "บริษัท เอ็นเอส เดลิคาเทสเซน จำกัด ",
  //     COMPANY: '"500 : 500 : บริษัท เอ็นเอส เดลิคาเทสเซน จำกัด"',
  //   },
  //   {
  //     ID: 9,
  //     CCCONO: 600,
  //     CCDIVI: "600",
  //     CCCONM: "บริษัท วินไทย ฟู้ด จำกัด ",
  //     COMPANY: '"600 : 600 : บริษัท วินไทย ฟู้ด จำกัด"',
  //   },
  // ];

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username (M3-Add on)"
          placeholder="Username (M3-Add on)"
          onChange={handleChange}
          value={values.username}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        <TextField
          select
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="company"
          label="Company"
          value={company}
          onChange={
            (handleChange = (event) => {
              // console.log(event.target.value);
              values.company = event.target.value;
              setCompany(event.target.value);
            })
          }
          SelectProps={{
            native: true,
          }}
        >
          <option />
          {companys.map((option) => (
            <option key={option.ID} value={option.COMPANY}>
              {option.COMPANY}
            </option>
          ))}
        </TextField>

        {loginReducer.isError && (
          <Alert severity="error" style={{ marginBottom: 8 }}>
            {loginReducer.result}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Sign In
        </Button>
        {/* <Grid container justify="flex-end">
          <a href="" target="_blank" style={{ textDecoration: "none" }}>
            Change password
          </a>
        </Grid> */}

        {/* <Grid container justify="flex-end">
          <a href={LinkPDF} target="_blank" style={{ textDecoration: "none" }}>
            Document
          </a>
        </Grid> */}
      </form>
    );
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/duck.png`}
        title="React"
      />

      <CardContent>
        {/* <p>#Debug prhead {JSON.stringify(company)}</p> */}
        <Typography variant="h5">React Demo</Typography>
        {/* HOC */}
        <Formik
          initialValues={{ username: "", password: "", company: "" }}
          onSubmit={(values, { setSubmitting }) => {
            // alert(JSON.stringify(values));
            dispatch(loginActions.login(values, props.history));
            setInterval(() => {
              setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
