import { timeRanges } from "@/constants/timeRanges";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TimeRangeSelectProps {
  value: "year" | "month" | "week";
  onChange: React.Dispatch<React.SetStateAction<"year" | "month" | "week">>;
}

const TimeRangeSelect = ({ value, onChange }: TimeRangeSelectProps) => {
  const handleStringToInt = (value: "year" | "month" | "week") => {
    onChange(value);
  };

  return (
    <Select onValueChange={handleStringToInt} value={value}>
      <SelectTrigger className="max-w-28 h-8">
        <SelectValue placeholder="Select a time range" />
      </SelectTrigger>
      <SelectContent>
        {timeRanges.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default TimeRangeSelect;
