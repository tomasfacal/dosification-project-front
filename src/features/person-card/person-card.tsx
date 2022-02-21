import { Fragment } from "react";
import styles from "./person-card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import cardBackground from "../../assets/images/backgroundCard.jpg";
import Avatar from "@mui/material/Avatar";
import { Person } from "@mui/icons-material";

interface Person {
  name: string;
  image: string;
}

const PersonCard = (props: Person) => {
  return (
    <Fragment>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia component="img" height="90" image={cardBackground} />
          <div className={styles.avatarContainer}>
            <Avatar
              className={styles.avatar}
              src={props.image}
              sx={{ width: 100, height: 100 }}
            />
            <CardContent>
              <Typography
                className={styles.name}
                gutterBottom
                variant="h5"
                component="div"
              >
                {props.name}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Fragment>
  );
};

export default PersonCard;
