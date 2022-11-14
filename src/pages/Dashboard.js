import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import "../App.css";
import { toast } from "react-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/actions";
import { auth, rootRef } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Lyrics, Movie } from "@mui/icons-material";
import { addSongPlaylist } from "../redux/actions/playlist.action";
import {
  deleteSOngsInitiate,
  addNewSong,
  getSongsInitiate,
  editSongs,
} from "../redux/actions/dashboard.action";
import Navbar from "../components/Navbar";
import {
  addNewPlaylist,
  getPlaylistInitiate,
} from "../redux/actions/playlist.action";

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

  // Handle Update songs functionality

  const [initialState, setState] = useState(songDetails); //initialState
  const [data, setData] = useState({});
  console.log("update data", data);
  const { song, singer, music, lyrics, movie } = initialState;

  const currentid = useParams();

  const { id } = currentid;

  console.log("currentid", currentid);

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
    if (isEmpty(id)) {
      setState({ ...songDetails });
    } else {
      setState({ ...data[id] });
    }
  }, [id, data]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...initialState, [name]: value });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState();

  const playlistHandleOpen = (id) => {
    setSelectedSongId(id);
    setPlaylistOpen(true);
  };
  const playlistHandleClose = () => setPlaylistOpen(false);

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

  const SubmitAddSong = (e, obj) => {
    e.preventDefault();
    console.log("initialState", initialState);
    if (isEmpty(id)) {
      dispatch(addNewSong(initialState));
      handleClose(true);
    } else {
      dispatch(editSongs(initialState, id));
      handleClose(true);
      navigate("/");
    }
  };

  // Manage Playlist Details

  const { playlist: playlistData } = useSelector((state) => state.playlist);
  console.log("Dashboard Playlist", playlistData);

  useEffect(() => {
    dispatch(getPlaylistInitiate());
  }, []);

  const SubmitPlaylistSong = (id) => {
    console.log("id--->", id);
    dispatch(addSongPlaylist(data, id));
    if (isEmpty(id)) {
      handleClose(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
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
                <TableCell align="right">Playlist</TableCell>
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
                      <Button
                        onClick={() => playlistHandleOpen(id)}
                        sx={{ backgroundColor: "blue" }}
                      >
                        <AddIcon sx={{ color: "white" }} />
                      </Button>
                    </TableCell>
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
                    value={music}
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
                {handleOpen ? "Update" : "Submit"}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={playlistOpen}
          onClose={playlistHandleClose}
          aria-labelledby="modal-modal-title1"
          aria-describedby="modal-modal-description1"
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
              Select Playlist
            </Typography>

            <form className="myform" noValidate>
              <Grid sx={{ paddingTop: "20px" }} container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Playlist
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={playlistData[id]}
                      label="Age"
                      onChange={handleChange}
                    >
                      {Object.keys(playlistData).map((id, item) => {
                        console.log("playlist data-->", playlistData[id], item);

                        return (
                          <MenuItem value={id}>
                            {playlistData[id].playlistName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="mysubmit"
                onClick={() => {
                  console.log("KKKKKKK", selectedSongId);
                  SubmitPlaylistSong(selectedSongId);
                }}
              >
                Add
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
