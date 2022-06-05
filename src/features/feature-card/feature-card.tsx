import { Fragment } from "react";
import styles from "./feature-card.module.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Feature {
  title: string;
  subtitle: string;
  image: string;
  buttons: {
    buttonText: string;
    buttonLink: string;
    buttonStyle: string;
  }[];
}

const FeatureCard: React.FC<Feature> = (props: Feature) => {
  return (
    <Fragment>
      <div className={styles.PatientsContainer}>
        <div className={styles.HomeSectionTitle}>{props.title}</div>
        <div className={styles.PatientsInfo}>
          <h2>{props.subtitle}</h2>
          <div className={styles.ImageContainer}>
            <img
              src={props.image}
              alt="ilustracion simulacion"
              className={styles.PatientImage}
            />
            <div className={styles.ButtonsContainer}>
              {props.buttons.map((button: any) => (
                <Button
                  color="primary"
                  variant={button.buttonStyle}
                  component={Link}
                  to={button.buttonLink}
                >
                  {button.buttonText}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FeatureCard;
