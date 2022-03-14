import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { Checkbox, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

import { saveTempWorkFlow } from "../../store/actions/save-workflow";

import PlusSquare from "../../components/Icons/PlusSquare";
import MinusSquare from "../../components/Icons/MinusSquare";
import CloseSquare from "../../components/Icons/CloseSquare";

const TransitionComponent = (props) => {
  return (
    <div>
      <Collapse {...props} />
    </div>
  );
};

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const Sidebar = ({ handleClick, workflowData = [] }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tempWorkflowData, setTempWorkflowData] = useState(workflowData);
  const dispatch = useDispatch();

  const handleOnClick = (nodeId) => {
    handleClick(nodeId);
  };
  const handleOnDone = (node, index, nodeId, message) => {
    const wflow = [...tempWorkflowData];
    const subSteps = wflow[0].steps[node].subSteps;
    const step = wflow[0].steps[node].step;
    if (subSteps.length > 0) {
      const newStatus = subSteps[index].status === "undone" ? "done" : "undone";
      subSteps[index].status = newStatus;
    } else {
      const newStatus = step.status === "undone" ? "done" : "undone";
      step.status = newStatus;
    }
    setTempWorkflowData(wflow);
    dispatch(saveTempWorkFlow(wflow));
    handleClick(nodeId);

    enqueueSnackbar("Done", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      variant: "success",
    });
  };

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["1"]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      onNodeSelect={(e, n) => handleOnClick(n)}
      sx={{
        height: "100%",
        paddingTop: "3rem",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      <StyledTreeItem nodeId="1" label="Workflow">
        <StyledTreeItem
          nodeId={tempWorkflowData[0]?.steps[1]?.step?.nodeId}
          label={tempWorkflowData[0]?.steps[1]?.step?.label}
        >
          {tempWorkflowData[0]?.steps[1]?.subSteps.map((item, index) => (
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <StyledTreeItem nodeId={item.nodeId} label={item.label} />
              <Checkbox
                onChange={() =>
                  handleOnDone(
                    1,
                    index,
                    item.nodeId,
                    "Placed Beaker with 1000ul of distilled H20"
                  )
                }
                checked={item.status === "undone" ? false : true}
                size="small"
              />
            </Box>
          ))}
        </StyledTreeItem>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
          }}
        >
          <StyledTreeItem
            nodeId={tempWorkflowData[0]?.steps[2]?.step?.nodeId}
            label={tempWorkflowData[0]?.steps[2]?.step?.label}
          />
          <Checkbox
            onChange={() =>
              handleOnDone(
                2,
                "",
                tempWorkflowData[0]?.steps[2]?.step?.nodeId,
                "Placed a new pipette tip on the pipettor"
              )
            }
            checked={
              tempWorkflowData[0]?.steps[2]?.step?.status === "undone"
                ? false
                : true
            }
            size="small"
          />
        </Box>

        <StyledTreeItem
          nodeId={tempWorkflowData[0]?.steps[3]?.step?.nodeId}
          label={tempWorkflowData[0]?.steps[3]?.step?.label}
          // nodeId="4"
          // label="Weigh the pipettes at 100% volume five times"
        >
          {tempWorkflowData[0]?.steps[3]?.subSteps.map((item, index) => (
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <StyledTreeItem nodeId={item.nodeId} label={item.label} />
              <Checkbox
                onChange={() => handleOnDone(3, index, item.nodeId, item.label)}
                checked={item.status === "undone" ? false : true}
                size="small"
              />
            </Box>
          ))}
        </StyledTreeItem>

        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
          }}
        >
          <StyledTreeItem
            nodeId={tempWorkflowData[0]?.steps[8]?.step?.nodeId}
            label={tempWorkflowData[0]?.steps[8]?.step?.label}
          />
          <Checkbox
            onChange={() =>
              handleOnDone(
                8,
                "",
                tempWorkflowData[0]?.steps[8]?.step?.nodeId,
                "Recorded weight of water"
              )
            }
            checked={
              tempWorkflowData[0]?.steps[8]?.step?.status === "undone"
                ? false
                : true
            }
            size="small"
          />
        </Box>

        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
          }}
        >
          <StyledTreeItem
            nodeId={tempWorkflowData[0]?.steps[9]?.step?.nodeId}
            label={tempWorkflowData[0]?.steps[9]?.step?.label}
          />
          <Checkbox
            onChange={() =>
              handleOnDone(
                9,
                "",
                tempWorkflowData[0]?.steps[9]?.step?.nodeId,
                "Calculated Mean, Std., Deviation, Accuracy and Precision"
              )
            }
            checked={
              tempWorkflowData[0]?.steps[9]?.step?.status === "undone"
                ? false
                : true
            }
            size="small"
          />
        </Box>
      </StyledTreeItem>
    </TreeView>
  );
};

export default Sidebar;
