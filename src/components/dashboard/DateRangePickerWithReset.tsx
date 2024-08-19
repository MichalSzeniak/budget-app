import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { DatePickerWithRange } from "../ui/dateRangePicker";

interface DateRangePickerWithResetProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetDate: () => void;
}

const DateRangePickerWithReset = ({
  date,
  setDate,
  resetDate,
}: DateRangePickerWithResetProps) => {
  return (
    <div className="flex items-center">
      <DatePickerWithRange date={date} setDate={setDate} />
      {date?.from && (
        <Button
          className="hidden sm:flex"
          variant="ghost"
          size="sm"
          onClick={resetDate}
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default DateRangePickerWithReset;
