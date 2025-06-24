import { Box, MenuItem, Select, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MeterTableV2 from "./meters/MeterTableV2";


const Meters = () => {
    const theme = useTheme();
    const [value, setValue] = useState(1);
    const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
    const MeterType = ['Meters-V1 - List', 'Sparkmeter-V2 - List', 'Meters (WIP) - List'];

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

const renderContent = () => {
    switch (value) {
        case 0:
            window.location.href = 'https://qa.huskneuron.com/admin/meters';
            return null;
        case 1:
            return <MeterTableV2 />;
        case 2:
            window.location.href = 'https://qa.huskneuron.com/admin/meterswip';
            return null;
        default:
            return null;
    }
};

    return (
        <Box>
            <Typography variant="h5" color="text.primary">
                Meters
            </Typography>
            {
                isTabletOrBelow ? (<Box sx={{ width: 250, mb: 2 }}>
                    <Select
                        fullWidth
                        value={value}
                        onChange={(e) => handleChange(null, e.target.value)}
                        displayEmpty
                        sx={{
                            bgcolor: '#1e293b',
                            color: '#fff',
                            borderRadius: 1,
                            px: 2
                        }}
                    >
                        {MeterType.map((label, index) => (
                            <MenuItem key={label} value={index}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>) : (
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        TabIndicatorProps={{ style: { display: 'none' } }}
                        centered
                        sx={{ borderBottom: `1px solid #444` }}
                    >
                        {
                            MeterType.map((label, index) => (
                                <Tab
                                    key={label}
                                    label={label}
                                    sx={{
                                        border: value === index ? `1px solid #888` : `none`,
                                        borderBottom: value === index ? `none` : `white`,
                                        borderRadius: `6px 6px 0 0`,
                                        bgcolor: value === index ? '#1e293b' : 'none',
                                        textTransform: `none`,
                                        color: value === index ? '#fff' : '#888',
                                        px: 2
                                    }}
                                />
                            ))
                        }
                    </Tabs>
                )
            }
            <Box sx={{ mt: 2 }}>
                {renderContent()}
            </Box>
        </Box>
    )
}

export default Meters;