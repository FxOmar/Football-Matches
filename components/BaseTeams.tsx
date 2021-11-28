import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import type { Contestant } from "../Interfaces/MatchInterface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BaseTeams: FC<{
  teams: Contestant[];
  addTeamToFollowingList: Function;
  followingList: Contestant[];
}> = ({ teams, addTeamToFollowingList, followingList }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [toggle, setToggle] = useState<{ [x: string]: boolean }>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function removeTeamFromFollowingList(
    arr: Contestant[],
    teamID: string
  ): Contestant[] {
    const index = arr.findIndex((el: Contestant) => el.id === teamID);

    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  }

  function handleFollowButtonClick(team: Contestant): void {
    setToggle((prevState) => ({
      ...prevState,
      [team.id]: !toggle[team.id],
    }));

    if (followingList.some((el: Contestant) => el.id === team.id)) {
      const teams = removeTeamFromFollowingList(followingList, team.id);

      addTeamToFollowingList([...teams]);
    } else {
      addTeamToFollowingList([...followingList, team]);
    }

    localStorage.setItem("teams", JSON.stringify(followingList));
  }

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {teams.map((team) => (
              <Grid item xs={2} sm={4} md={4} key={team.id}>
                <Item>{team.official_name}</Item>
                <ToggleButton
                  value={team.id}
                  aria-label={team.id}
                  selected={toggle![team.id]}
                  onChange={() => handleFollowButtonClick(team)}
                >
                  {!toggle![team.id] ? <StarOutlineIcon /> : <StarIcon />}
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default BaseTeams;
