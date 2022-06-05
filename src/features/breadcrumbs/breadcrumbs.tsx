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

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ values }: BreadcrumbsProps) => (
  <div className={styles.breadcrumbContainer}>
    <ul className={styles.breadcrumbsList}>
      {values.map((value) =>
        value.clickable ? (
          <li key={value.name}>
            <Link to={`${value.link}`}>{value.name}</Link>
          </li>
        ) : (
          <li key={value.name}>
            <Typography className={styles.unable}>{value.name}</Typography>
          </li>
        )
      )}
    </ul>
  </div>
);

export default Breadcrumbs;
