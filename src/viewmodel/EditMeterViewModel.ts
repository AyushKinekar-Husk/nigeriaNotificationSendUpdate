
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { NeuronAddMeterService } from "../services/meterService";
import { ROUTES } from "../route/RouteConstant";

export const EditMeterViewModel = () => {
  const { meterSerial } = useParams();
  const navigate = useNavigate();

  const [meterState, setMeterState] = useState("SPARE");
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    navigate(ROUTES.OPERATIONS_METERS);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        MeterSerial: meterSerial || "",
        MeterState: meterState,
      };
      await NeuronAddMeterService.editMeter(payload);
      navigate(ROUTES.OPERATIONS_METERS);
    } catch (error) {
      console.error("Error saving meter:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    meterSerial,
    meterState,
    setMeterState,
    handleSave,
    handleCancel,
    isSaving,
  };
};
