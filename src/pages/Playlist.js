import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { auth, rootRef } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Lyrics, Movie } from "@mui/icons-material";
import { isEmpty } from "lodash";
import {
  deleteSOngsInitiate,
  getSongsInitiate,
  editSongs,
} from "../redux/actions/dashboard.action";
import {
  addNewPlaylist,
  editPlaylist,
  deletePlaylistInitiate,
} from "../redux/actions/playlist.action";
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
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const Playlist = () => {
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

  const [playlistDetails, setPlaylistDetails] = useState({
    playlistName: "",
  });

  // UseEffect way to get data

  const [soData, setSoData] = useState({});
  console.log("soData", soData);

  useEffect(() => {
    rootRef.child("playlist").on("value", (snapshot) => {
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

  const [initialState, setState] = useState(playlistDetails); //initialState

  const [data, setData] = useState({});
  console.log("update data", data);

  const { playlistName } = initialState;

  const currentid = useParams();

  const { id } = currentid;

  console.log("currentid", currentid);

  useEffect(() => {
    rootRef.child("playlist").on("value", (snapshot) => {
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
      setState({ ...playlistDetails });
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

  const { currentUser } = useSelector((state) => state.user);

  const [playlistData, setSongData] = useState({});
  console.log("songsdata", playlistData);
  const playlist = useSelector((state) => state.myplaylist);
  console.log("state==>", playlist);

  useEffect(() => {
    dispatch(getSongsInitiate());
    //setSongData(data);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record")) {
      dispatch(deletePlaylistInitiate(id));
    }
  };

  console.log("Res", playlist);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle Logout Functionality

  // const handleLogout = () => {
  //   if (currentUser) {
  //     dispatch(logoutInitiate());
  //     navigate("/login");
  //   }
  // };

  //Handle Submit song Functionality

  // const SubmitSong = () => {
  //   dispatch(addInitiate());
  // };

  const SubmitAddPlaylist = (e, obj) => {
    e.preventDefault();
    console.log("initialState", initialState);
    if (isEmpty(id)) {
      // rootRef.child("songs").push(initialState, (error) => {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      dispatch(addNewPlaylist(initialState));
      handleClose(true);
    } else {
      dispatch(editPlaylist(initialState, id));
      handleClose(true);
      navigate("/playlist");

      // rootRef.child(`songs/${id}`).set(initialState, (error) => {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
    }
  };

  // const SubmitAddPlaylist = () => {
  //   if (!song || !lyrics || !music || !singer || !movie) {
  //     toast.error("Please provide value in each fields");
  //   } else {
  //     rootRef.child("songs").push(playlistDetails, (error) => {
  //       if (error) {
  //         toast.error(error);
  //       } else {
  //         setPlaylistDetails({
  //           song: "",
  //           singer: "",
  //           music: "",
  //           lyrics: "",
  //           movie: "",
  //         });
  //         handleClose(true);
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "Song Added Successfully",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     });
  //   }
  // };

  //SideMenu

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
            PlayList
          </Typography>

          <Button
            variant="outlined"
            sx={{
              backgroundColor: "palevioletred",
              color: "black",
            }}
            onClick={handleOpen}
          >
            Add PlayList
          </Button>
          <Table
            sx={{ minWidth: 650, paddingTop: "20px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Sr No</TableCell>
                <TableCell align="right">Playlist Name</TableCell>
                <TableCell align="right">Update Playlist</TableCell>
                <TableCell align="right">Delete Playlist</TableCell>
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
                    <TableCell align="right">
                      {soData[id].playlistName}
                    </TableCell>

                    <TableCell align="right">
                      <Link to={`/playlist/update/${id}`}>
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
              Add Playlist Name
            </Typography>

            <form className="myform" noValidate>
              <Grid sx={{ paddingTop: "20px" }} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="playlistName"
                    label="Playlist Name"
                    name="playlistName"
                    value={playlistName || ""}
                    autoComplete="playlist"
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
                onClick={SubmitAddPlaylist}
              >
                {handleOpen ? "Update" : "Submit"}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Playlist;
