import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { selectTransactions } from "@/store/transactionsSlice";
import { ListFilter } from "lucide-react";
import { useState, useMemo } from "react";

interface FilterDropdownProps {
  onFilterChange: (categories: string[]) => void;
}

const FilterDropdown = ({ onFilterChange }: FilterDropdownProps) => {
  const transactions = useSelector(selectTransactions);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const expenseCategories = useMemo(
    () =>
      Array.from(
        new Set(
          transactions
            .filter((tx) => tx.type === "expense")
            .map((tx) => tx.category)
        )
      ),
    [transactions]
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newSelectedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((cat) => cat !== category);

    setSelectedCategories(newSelectedCategories);
    onFilterChange(newSelectedCategories);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {expenseCategories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) =>
              handleCategoryChange(category, checked)
            }
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
