import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ClassLayout from "../../../features/student-pages/classes-page/components/classLayout";
import { OfflineClassIcon } from "utils/images";
import ClassTabs from "../../../features/student-pages/classes-page/components/classTabs";
import UpcomingClassList from "features/student-pages/classes-page/components/upcommingClass";
import CompletedClassList from "features/student-pages/classes-page/components/completedClass";
import LiveClassList from "features/student-pages/classes-page/components/liveClass";
import ClassHistory from "features/student-pages/classes-page/components/classHistory";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "features/student-pages/classes-page/redux/thunks";
import {
  selectClasses,
  selectLoading,
  selectStudentClasses,
} from "features/student-pages/classes-page/redux/selectors";
import ClassLoader from "components/ui/loaders/classLoading";

const ClassesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [value, setValue] = useState(queryParams.get("tab") || "upcoming");
  const [classType, setClassType] = useState(queryParams.get("classType") || "online");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [filters, setFilters] = useState({
    course: "",
    month: "",
    year: "",
  });
  const dispatch = useDispatch();
  const classes = useSelector(selectStudentClasses);
  const loading = useSelector(selectLoading);

  const tabs = [
    { id: "1", title: "Upcoming Classes", value: "upcoming" },
    { id: "2", title: "Completed Classes", value: "completed" },
    { id: "3", title: "Class History", value: "history" },
    { id: "4", title: "Live Class", value: "live" },
  ];

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      course: "",
      month: "",
      year: "",
    });
  };

  const renderComponents = {
    upcoming: (
      <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
        <UpcomingClassList data={classes} classType={classType} group={"upcoming"} />
      </Box>
    ),
    completed: (
      <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
        <CompletedClassList data={classes} classType={classType} group={"completed"} />
      </Box>
    ),
    history: (
      <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
        <ClassHistory
          data={classes}
          classType={classType}
          group={"history"}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </Box>
    ),
    live: (
      <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
        <LiveClassList data={classes} classType={classType} group={"live"} />
      </Box>
    ),
  };

  const classTypes = [
    { id: "1", title: "Live Class", value: "online" },
    { id: "2", title: "Offline Class", value: "offline" },
  ];

  const fetchData = async () => {
    const data = {
      userType: classType,
      classType: value,
      page: page,
      month: filters.month,
      year: filters.year,
      course: filters.course,
    };
    try {
      await dispatch(getAllClasses(data));
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      // Optionally, you can set an error state here to display an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, classType, value, page, filters]);

  const handleChange = (event, newValue) => {
    setPage(1);
    setValue(newValue);
    navigate(`?tab=${newValue}&classType=${classType}&page=1`);
  };

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
    navigate(`?tab=${value}&classType=${event.target.value}&page=1`);
  };

  const handleNextChange = () => {
    setPage(page + 1);
    navigate(`?tab=${value}&classType=${classType}&page=${page + 1}`);
  };

  const handlePrevious = () => {
    setPage(page - 1);
    navigate(`?tab=${value}&classType=${classType}&page=${page - 1}`);
  };

  return (
    <ClassLayout>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              color: "#484848",
              mb: "4px",
              pl: "40px",
            }}
          >
            Classes
          </Typography>
        </Box>
        <Card>
          <Grid container sx={{ height: "auto", width: "100%" }}>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  px: "40px",
                  py: "20px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "32px",
                    color: "#495057",
                  }}
                >
                  {classType === "online" ? "Online Classes" : "Offline Classes"}
                </Typography>
                <img src={OfflineClassIcon} alt="Live Class" />
              </Box>
              <Box>
                <ClassTabs
                  tabs={tabs}
                  value={value}
                  handleChange={handleChange}
                  tabIndex={1}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                px: "20px",
                alignItems: "center",
              }}
              tabIndex={2}
            >
              <Box>
                <FormControl>
                  <Select value={classType} onChange={handleClassTypeChange}>
                    {classTypes.map((list) => (
                      <MenuItem key={list.id} value={list.value}>
                        {list.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {loading ? <ClassLoader /> : renderComponents[value]}

        {classes?.last_page > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              py: "40px",
            }}
          >
            <Box sx={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <Typography
                onClick={page === 1 ? null : handlePrevious}
                sx={{
                  color: page === 1 ? "#B0B0B0" : "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}
                tabIndex={2}
              >
                Previous
              </Typography>
              <Typography
                onClick={page === classes?.last_page ? null : handleNextChange}
                sx={{
                  color: page === classes?.last_page ? "#B0B0B0" : "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  cursor: page === classes?.last_page ? "not-allowed" : "pointer",
                }}
                tabIndex={3}
              >
                Next
              </Typography>
              <Box sx={{ display: "inline-flex", gap: "4px" }}>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  {page}
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  of
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  {classes?.last_page}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ClassLayout>
  );
};

export default ClassesPage;