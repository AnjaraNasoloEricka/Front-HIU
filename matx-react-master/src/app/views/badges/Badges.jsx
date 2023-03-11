import { Box, Breadcrumbs, Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import VerifiedIcon from "@mui/icons-material/Verified";
import { SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [isLoadingBadge, setIsLoadingBadge] = useState(true);
  const initializeBadgeList = () => {
    setIsLoadingBadge(true);
    setBadges([
      {
        _id: "640bdfd0b153d93d4122cdd8",
        description: "Ce badge a ete obtenu apres votre premier quizz",
        etudiants: [
          {
            idEtudiant: "64063960c2f732da57d49878",
          },
          {
            idEtudiant: "hvchvc",
          },
          {
            idEtudiant: "koko",
          },
        ],
        level: "bronze",
        titre: "Premier Quiz",
      },
      {
        _id: "640be00fb153d93d4122cdd9",
        description: "Ce badge a ete obtenu apres votre premier forum",
        etudiants: [
          {
            idEtudiant: "64063960c2f732da57d49878",
          },
          {
            idEtudiant: "hvchvc",
          },
          {
            idEtudiant: "koko",
          },
        ],
        level: "bronze",
        titre: "Premier Forum",
      },
    ]);
    setIsLoadingBadge(false);
  };
  useEffect(() => {
    initializeBadgeList();
  }, []);

  const LEVELS = {
    BRONZE: "bronze",
    SILVER: "silver",
    GOLD: "gold",
  };
  const COLORS = {
    BRONZE: "#371D1D",
    SILVER: "#ABABAB",
    GOLD: "yellow",
  };
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumbs routeSegments={[{ name: "Badge", path: "/badges" }]} />
        </Box>
        <SimpleCard
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <VerifiedIcon style={{ marginRight: 10 }} /> Vos badges
            </div>
          }
        >
          <Stack spacing={3}>
            {badges &&
              badges.map((badge) => {
                let color = "brown";
                if (badge.level === LEVELS.BRONZE) {
                  color = COLORS.BRONZE;
                } else if (badge.level === LEVELS.SILVER) {
                  color = COLORS.SILVER;
                } else if (badge.level === LEVELS.GOLD) {
                  color = COLORS.GOLD;
                }
                return (
                  <div>
                    <SimpleCard>
                      <div style={{ display: "flex", alignItems: "end" }}>
                        {
                          <MilitaryTechIcon
                            sx={{ color: color }}
                            style={{ fontSize: 50 }}
                          />
                        }
                        <strong style={{
                          color: color
                        }}>{badge.titre}</strong>
                      </div>
                      <br />
                      <p style={{marginLeft: 18, color: 'gray'}}>{badge.description}</p>
                    </SimpleCard>
                  </div>
                );
              })}{" "}
          </Stack>
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Badges;
