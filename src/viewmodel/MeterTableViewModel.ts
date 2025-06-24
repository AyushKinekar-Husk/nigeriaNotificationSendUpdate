import { useEffect, useMemo, useState, useCallback } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NeuronAddMeterService } from "../services/meterService";
import { Meter } from "../interface/meterTypes";
import logger from "../utils/logger";
import { setPermissions } from "../store/slice/permissionSlice";
import { RootState } from "../store";


export const MeterTableViewModel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [pageSize, setPageSize] = useState(isMobile ? 10 : 10);
  const [data, setData] = useState<{ data: Meter[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDate, setSearchTermDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const userId = useSelector<RootState>(state => state.user.userDetails.id)
  const totalPages = useMemo(() => {
    return Math.ceil(data.total / pageSize);
  }, [data.total, pageSize]);

  const fetchData = useCallback(async (reload = false) => {
    setIsLoading(true);
    try {
     if(userId){
       const response = await NeuronAddMeterService.getList({
       pagination: reload
          ? { current: 1, pageSize: 10 }
          : { current, pageSize },
        query:  !reload&&hasSearched ? searchTerm : undefined,
        date: !reload&&hasSearched ? searchTermDate : undefined,
      });
      setData(response);
     }
    } catch (error) {
      logger.error(`${MeterTableViewModel.name} - fetchData`, error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, searchTermDate, hasSearched, current, pageSize,userId]);

  const fetchPermissions = useCallback(async () => {
    console.log(userId, "userId in fetchPermissions");
    
    try {
      if (userId) {
        const result = await NeuronAddMeterService.checkPermissions([
          "ManageCreateMeterV2",
          "ManageEditMeterV2"
        ]);


        const permissionsArray = result?.permissions || [];
        const accessIds = result?.accessIds || [];
       console.log(permissionsArray, "permissionsArray in fetchPermissions",result);
  

        const formattedPermissions = permissionsArray.reduce(
          (acc: Record<string, boolean>, item: any) => {
            acc[item.systemName] = item.allowed;
            return acc;
          },
          {}
        );

        const payload = {
          ...formattedPermissions,
          nocIds: accessIds.map(String), // Ensure all IDs are strings
        };


        dispatch(setPermissions(payload));
      }
    } catch (error) {
      logger.error(`${MeterTableViewModel.name} - fetchPermissions`, error);
    }
  }, [dispatch,userId]);

// Fetch permissions only once when userId becomes available
useEffect(() => {
  if (userId) {
    fetchPermissions();
  }
}, [userId]);

// Fetch data when filters change
useEffect(() => {
  fetchData();
}, [fetchData]);

  const triggerSearch = () => {
    setCurrent(1);
    setSearchTerm(searchQuery);
    setSearchTermDate(searchDate);
    setHasSearched(true);
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await NeuronAddMeterService.getList({
        pagination: { current: current, pageSize: pageSize },
        query: hasSearched ? searchTerm : undefined,
        date: hasSearched ? searchTermDate : undefined,
      });

      const records = response.data;

      const csvData = records.map((record: Meter) => ({
        "Meter Serial": record.MeterSerial,
        "Meter GUID": record.MeterGUID,
        "Meter State": record.MeterState,
        "Pole ID": record.PoleId,
        "Customer ID": record.CustomerId,
      }));

      if (csvData.length === 0) {
        alert("No data to export.");
        return;
      }

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [
          Object.keys(csvData[0]).join(","),
          ...csvData.map((row) => Object.values(row).join(",")),
        ].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "meters_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      logger.error(`${MeterTableViewModel.name} - handleExport`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    current,
    pageSize,
    data,
    isLoading,
    totalPages,
    searchQuery,
    setSearchQuery,
    searchDate,
    setSearchDate,
    fetchData,
    setCurrent,
    setPageSize,
    handleExport,
    triggerSearch,
    isMobile,
    openDrawer,
    setOpenDrawer,
  };
};
