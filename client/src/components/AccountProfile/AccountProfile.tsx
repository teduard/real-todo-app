import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import UserFront from "@userfront/react";

class AccountProfile extends React.Component {
  render() {
    const user = {
      avatar: UserFront.user.image,
      name: UserFront.user.name,
      email: UserFront.user.email,
    };

    return (
      <Box
        sx={{
          minHeight: "100%",
          py: 3,
        }}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img src={user.avatar} width="100" height="100" alt={user.name} />
              <Typography color="textPrimary" gutterBottom variant="h3">
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body1"></Typography>
              <Typography color="textSecondary" variant="body1"></Typography>
              <Typography>{user.email}</Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
              onClick={UserFront.logout}
            >
              Logout
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}

export default AccountProfile;
