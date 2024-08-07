import { Grid, Card, Box, Typography } from "@mui/material";

const TicketCard = ({ticket}) => {
  return (
    <Card sx={{ mt: 5 }}>
      <Grid sx={{ display: "flex", flexDirection: "row" }} xs={12}>
        <Grid xs={4}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              px: "24px",
              py: "34px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h1" sx={{ color: "black", fontSize: 20 }}>
              Ticket
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#6D6D6D", fontSize: 12 }}>
                Total {ticket?.total}
              </Typography>
              <Typography sx={{ color: "#6D6D6D", fontSize: 12 }}>
                Ticket Raised
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              backgroundColor: "#B4FDEF",
              display: "flex",
              px: "24px",
              py: "34px",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: 48,
                color: "#29AA92",
                textAlign: "cetner",
              }}
            >
              {ticket?.closed}
            </Typography>
            <Typography
              sx={{ color: "#29AA92", fontSize: 14, fontWeight: 700 }}
            >
              Completed
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#FFC5C5",
              px: "24px",
              py: "34px",
              flexDirection: "column",
              alignItems: "center",
              height: "100%"
            }}
          >
            <Typography
              sx={{ fontWeight: 800, color: "#FF1B1B", fontSize: 48 }}
            >
              { ticket?.opened }
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "#FF1B1B" }}>
              Pending
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TicketCard;
