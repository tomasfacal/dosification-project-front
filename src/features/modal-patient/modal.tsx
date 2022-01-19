import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CallToAction from "../call-to-action/call-to-action";

interface BasicModalProps {
  open: boolean;
  text: string;
  onClose: () => void;
}

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

const ChildModal = (props: BasicModalProps) => {
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {props.text}
          </Typography>
          <CallToAction
            text="En caso de querer crear un nuevo paciente: "
            url="/create-patient"
            urlText="Click aquí"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ChildModal;
