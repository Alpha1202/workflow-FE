/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import { useSnackbar } from "notistack";

import Sidebar from "../../components/Sidebar";
import Workflow from "../../components/workflow";
import Loading from "../LoadingScreen";

import { getWorkflowRequest } from "../../store/actions/get-workflow";
import { saveWorkflowRequest } from "../../store/actions/save-workflow";

const Index = () => {
  const workflowEl = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [highlighted, setHighlighted] = useState("");
  const dispatch = useDispatch();
  const { isLoading, workflow } = useSelector((s) => s.getWorkflow);
  const { tempWorkflow } = useSelector((s) => s.saveWorkflow);
  const [, setElements] = useState(workflow.steps);

  const handleClick = (nodeId) => setHighlighted(nodeId);

  const handleSave = async () => {
    if (tempWorkflow.length < 1) {
      enqueueSnackbar("You have not made any changes", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
        variant: "error",
      });
      return;
    }
    const resp = await dispatch(saveWorkflowRequest({ ...tempWorkflow[0] }));
    if (resp.status === "success") {
      enqueueSnackbar("Saved successfully", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
        variant: "success",
      });
    } else {
      enqueueSnackbar("Something went wrong", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
        variant: "error",
      });
    }
  };

  const handleDownload = async () => {
    const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = {
      cropPositionTop: 0,
      cropPositionLeft: 0,
      cropPositionRight: 0,
      cropWidth: 1400,
      cropHeigth: 1800,
    };

    html2canvas(workflowEl.current).then((canvas) => {
      let croppedCanvas = document.createElement("canvas");
      let croppedCanvasContext = croppedCanvas.getContext("2d");

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeigth;

      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

      const a = document.createElement("a");
      a.href = croppedCanvas.toDataURL();
      a.download = "workflow.png";
      a.click();
    });

    const jsonString = JSON.stringify(workflow[0]);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "workflow.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(async () => {
    const wflow = await dispatch(getWorkflowRequest());
    setElements(wflow[0].steps);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              flexDirection: "row",
            }}
          >
            <Sidebar
              workflowData={workflow}
              handleClick={(nodeId) => handleClick(nodeId)}
            />
          </Box>
          <Box
            ref={workflowEl}
            sx={{
              display: "flex",
              width: "75%",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              flexDirection: "row",
            }}
          >
            <Workflow data={workflow[0]?.steps} highlighted={highlighted} />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "25%",
              alignItems: "center",
              justifyContent: "space-evenly",
              alignSelf: "flex-start",
              height: "50vh",
              flexDirection: "column",
            }}
          >
            <Button onClick={handleSave} variant="contained" color="success">
              Save
            </Button>
            <Button onClick={handleDownload} variant="outlined">
              Download
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Index;
