import React, { useState, useEffect } from "react";
import "../App.css";
import { toast } from "react-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  Table,
  TableHead,
  Modal,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/actions";
import { auth, rootRef } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Lyrics, Movie } from "@mui/icons-material";
import {
  deleteSOngsInitiate,
  getSongsInitiate,
} from "../redux/actions/dashboard.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [songDetails, setSongDetails] = useState({
    song: "",
    singer: "",
    music: "",
    lyrics: "",
    movie: "",
  });

  // UseEffect way to get data

  const [soData, setSoData] = useState({});

  useEffect(() => {
    rootRef.child("songs").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setSoData({ ...snapshot.val() });
      } else {
        setSoData({});
      }
    });

    return () => {
      setSoData({});
    };
  }, []);

  const { song, singer, music, lyrics, movie } = songDetails;

  // Handle Update songs functionality

  const [songState, setSongState] = useState(songDetails); //initialState
  const [data, setData] = useState({});
  console.log("update data", data);

  const { id } = useParams();

  useEffect(() => {
    rootRef.child("songs").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setSongState({ ...data[id] });
    } else {
      setSongState({ ...songDetails });
    }

    return () => {
      setSongState({ ...songDetails });
    };
  }, [id, data]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSongDetails({ ...songDetails, [name]: value });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentUser } = useSelector((state) => state.user);

  const [songData, setSongData] = useState({});
  console.log("songsdata", songData);
  const songs = useSelector((state) => state.usersongs);
  console.log("state==>", songs);

  useEffect(() => {
    dispatch(getSongsInitiate());
    //setSongData(data);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record")) {
      dispatch(deleteSOngsInitiate(id));
    }
  };

  console.log("Res", songs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle Logout Functionality

  const handleLogout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
      navigate("/login");
    }
  };

  //Handle Submit song Functionality

  // const SubmitSong = () => {
  //   dispatch(addInitiate());
  // };

  const SubmitAddSong = () => {
    if (!song || !lyrics || !music || !singer || !movie) {
      toast.error("Please provide value in each fields");
    } else {
      rootRef.child("songs").push(songDetails, (error) => {
        if (error) {
          toast.error(error);
        } else {
          setSongDetails({
            song: "",
            singer: "",
            music: "",
            lyrics: "",
            movie: "",
          });
          handleClose(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Song Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" type="button" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="Dashboardapp">
        <TableContainer sx={{ width: "900px" }} component={Paper}>
          <Typography
            sx={{
              fontSize: "25px",
              textAlign: "center",
              color: "blue",
              paddingBottom: "30px",
              fontStyle: "italic",
              fontFamily: "fantasy",
            }}
          >
            Songs List
          </Typography>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: "palevioletred",
              color: "black",
            }}
            onClick={handleOpen}
          >
            Add Song
          </Button>
          <Table
            sx={{ minWidth: 650, paddingTop: "20px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Song Name</TableCell>
                <TableCell align="right">Singer Name</TableCell>
                <TableCell align="right">Music Name</TableCell>
                <TableCell align="right">Lyrics Name</TableCell>
                <TableCell align="right">Movie Name</TableCell>
                <TableCell align="right">Update Song</TableCell>
                <TableCell align="right">Delete Song</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(soData).map((id, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" key={id}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{soData[id].song}</TableCell>
                    <TableCell align="right">{soData[id].singer}</TableCell>
                    <TableCell align="right">{soData[id].music}</TableCell>
                    <TableCell align="right">{soData[id].lyrics}</TableCell>
                    <TableCell align="right">{soData[id].movie}</TableCell>
                    <TableCell align="right">
                      <Link to={`/update/${id}`}>
                        {" "}
                        <Button onClick={handleOpen} variant="outlined">
                          Update
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{
                fontSize: "25px",

                color: "blue",

                fontStyle: "italic",
                fontFamily: "fantasy",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add Song details
            </Typography>

            <form className="myform" noValidate>
              <Grid sx={{ paddingTop: "20px" }} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="song"
                    label="Song Name"
                    name="song"
                    value={song || ""}
                    autoComplete="song"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="singer"
                    label="Singer Name"
                    type="text"
                    id="singer"
                    value={singer || ""}
                    autoComplete="singer"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="music"
                    label="Music Name"
                    type="text"
                    id="music"
                    value={music || ""}
                    autoComplete="music"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="lyrics"
                    label="Lyrics Name"
                    type="text"
                    id="lyrics"
                    value={lyrics || ""}
                    autoComplete="lyrics"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="movie"
                    label="Movie Name"
                    type="text"
                    id="movie"
                    value={movie || ""}
                    autoComplete="movie"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="mysubmit"
                onClick={SubmitAddSong}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Dashboard;

// Song
// Singer
// Music
// Lyrics
// Movie
