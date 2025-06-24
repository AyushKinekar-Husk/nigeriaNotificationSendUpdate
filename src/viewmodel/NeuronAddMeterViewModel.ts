import { useState, useEffect, useRef } from "react";
import { NeuronAddMeterService } from "../services/meterService";
import logger from "../utils/logger";
import { ROUTES } from "../route/RouteConstant";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { useSelector } from "react-redux";

interface Plant {
  id: number;
  name: string;
}

interface Pole {
  id: number | string;
  name: string;
}

interface Server {
  id: number | string;
  name: string;
}

export const NeuronAddMeterViewModel = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [poles, setPoles] = useState<Pole[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [meterSerial, setMeterSerial] = useState<any[]>([]);

  const [selectedPlant, setSelectedPlant] = useState<number | null>(null);
  const [selectedPole, setSelectedPole] = useState<Pole | null>(null);
  const [selectedServer, setSelectedServer] = useState<string | number | null>(null);
  const [selectedMeter, setSelectedMeter] = useState<string | number | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const hasFetchedRef = useRef(false);
  const navigate = useNavigate();
  const nocIds = useSelector((state: RootState) => state.permissions.nocIds);

  // Fetch plants on mount
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    NeuronAddMeterService.getPlants(nocIds)
      .then((res: any) => {
        if (res) {
          const mappedPlants: Plant[] = res.map((plant: any) => ({
            id: plant.Id,
            name: plant.DisplayName || plant.PlantName || `Plant-${plant.Id}`,
          }));
          setPlants(mappedPlants);
        }
      })
      .catch((error) => {
        logger.error(`${NeuronAddMeterViewModel.name} - getPlants`, error);
      });
  }, []);

  // Fetch poles when plant changes
  useEffect(() => {
    if (selectedPlant !== null) {
      setPoles([]);
      setSelectedPole(null);
      setServers([]);
      setSelectedServer(null);


      NeuronAddMeterService.getPolesByPlantId(selectedPlant)
        .then((res: any) => {
          if (res) {
            const mappedPoles: Pole[] = res.map((pole: any) => ({
              id: pole.Id,
              name: pole.PoleNumber,
            }));
            setPoles(mappedPoles);
          }
        })
        .catch((error) => {
          logger.error(`${NeuronAddMeterViewModel.name} - getPolesByPlantId`, error);
        });
    }
  }, [selectedPlant]);

  // Fetch servers when pole changes
  useEffect(() => {
    if (selectedPlant && selectedPole !== null) {
      setServers([]);
      setSelectedServer(null);

      NeuronAddMeterService.getPlantServersByPlantId(selectedPlant)
        .then((res: any) => {
          if (res) {
            const mappedServers: Server[] = res.map((server: any) => ({
              id: server.Id,
              name: server.ServerDetails,
            }));
            setServers(mappedServers);
          }
        })
        .catch((error) => {
          logger.error(`${NeuronAddMeterViewModel.name} - getPlantServersByPlantId`, error);
        });
    }
  }, [selectedPole]);

  // Fetch unassigned meters when pole changes
  useEffect(() => {
    if (selectedPole !== null) {
      setMeterSerial([]);
      setSelectedMeter(null);

      NeuronAddMeterService.getUnassignedMeter()
        .then((res: any) => {
          if (res) {
            const mappedMeters = res.map((meter: any) => ({
              name: meter.serial,
            }));
            setMeterSerial(mappedMeters);
          }
        })
        .catch((error) => {
          logger.error(`${NeuronAddMeterViewModel.name} - getUnassignedMeter`, error);
        });
    }
  }, [selectedPole]);

  // Unified plant change handler
  const handlePlantChange = (plantId: number) => {
    setSelectedPlant(plantId);

  };

  const handleSave = async () => {
    if (!selectedPlant || !selectedPole || !selectedServer) {
      toast.warn("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        meterSerial: selectedMeter,
        plantId: Number(selectedPlant),
        poleNumber: Number(selectedPole.id),
        plantServerId: Number(selectedServer),
      };

      const res = await NeuronAddMeterService.create(payload);

      if (res && res.data) {
        navigate(ROUTES.OPERATIONS_METERS);
      }
    } catch (error) {
      logger.error(`${NeuronAddMeterViewModel.name} - handleSave`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    plants,
    poles,
    servers,
    meterSerial,
    selectedPlant,
    selectedPole,
    selectedServer,
    setSelectedPlant: handlePlantChange,
    setSelectedPole,
    setSelectedServer,
    setSelectedMeter,
    setMeterSerial,
    handleSave,
    isLoading,
  };
};
