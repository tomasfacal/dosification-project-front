import { Fragment } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import styles from "./breadcrumbs.module.scss";

interface BreadcrumbsItem {
  name: string;
  link: string;
  clickable: boolean;
  actual: boolean;
}

interface BreadcrumbsProps {
  values: Array<BreadcrumbsItem>;
}

const Breadcrumbs = ({ values }: BreadcrumbsProps) => (
  <div className={styles.breadcrumbContainer}>
    {values.map((value, index) =>
      value.clickable ? (
        <Fragment key={value.name}>
          <Link to={`${value.link}`} className="btn btn-primary">
            {value.name}
          </Link>
          {index !== values.length - 1 && (
            <ChevronRightIcon className={styles.icon} />
          )}
        </Fragment>
      ) : (
        <Fragment key={value.name}>
          <Typography
            className={
              value.actual ? styles.actualBreadcrumb : styles.futureBreadcrumb
            }
          >
            {value.name}
          </Typography>
          {index !== values.length - 1 && (
            <ChevronRightIcon className={styles.icon} />
          )}
        </Fragment>
      )
    )}
  </div>
);

export default Breadcrumbs;
