import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Collapse,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Meter } from "../../../../../interface/meterTypes";
import { formatDateString } from "../../../../../utils/dateFormate";
import { getStyles } from "../../../../../styles/component/MeterV2Card.styles";

const MeterV2Card = ({ customer }: { customer: Meter }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setExpanded(!expanded)}
          sx={styles.clickableRow}
        >
          <Col label="MeterSerial:" value={customer?.MeterSerial} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Col
              label={customer?.MeterGUID}
              value={customer?.MeterState}
              textAlign="end"
            />
            {expanded ? (
              <ExpandLessIcon sx={styles.expandIcon} />
            ) : (
              <ExpandMoreIcon sx={styles.expandIcon} />
            )}
          </Stack>
        </Stack>
      </CardContent>

      <Collapse in={expanded}>
        <CardContent sx={styles.collapseContent}>
          <Stack spacing={1}>
            <Row label="Customer Name :" value={customer?.CustomerName} />
            <Row
              label="Previous Meter Reading Date :"
              value={formatDateString(
                customer?.PreviousMeterReadingDate as string
              )}
            />
            <Row
              label="Meter Reading Date :"
              value={formatDateString(customer?.MeterReadingDate as string)}
            />
            <Row
              label="Previous Meter Reading :"
              value={customer?.PreviousMeterReading}
            />
            <Row label="Meter Reading :" value={customer?.MeterReading} />
            <Row label="Consumed Energy :" value={customer?.ConsumedEnergy} />
            <Row label="Tariff Rate :" value={customer?.TariffRate || "-"} />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Row = ({ label, value }: { label: string; value: any }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" sx={styles.rowLabel}>
        {label}
      </Typography>
      <Typography variant="body2" sx={styles.rowValue}>
        {value ?? "-"}
      </Typography>
    </Stack>
  );
};

const Col = ({
  label,
  value,
  textAlign,
}: {
  label: string;
  value: any;
  textAlign?: any;
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={styles.colContainer}
    >
      <Typography variant="body2" sx={{ ...styles.colLabel, textAlign }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ ...styles.colValue, textAlign }}>
        {value ?? "-"}
      </Typography>
    </Stack>
  );
};

export default React.memo(MeterV2Card);
