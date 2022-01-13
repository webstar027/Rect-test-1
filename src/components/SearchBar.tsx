import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useCallback } from "react";

interface SearchBarProps {
  className?: string;
  query?: string;
  onChange?(query: string): void;
  loading?: boolean;
}

const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    loadingWrapper: {
      position: "relative",
    },
    progress: {
      position: "absolute",
      top: -4,
      left: -5,
    },
  });
});

const SearchBar = ({ className, query, onChange, loading }: SearchBarProps) => {
  const classes = useStyle();
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (onChange) onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <form className={className} noValidate autoComplete="on" onSubmit={(event) => event.preventDefault()}>
      <TextField
        id="search-bar-text-field"
        placeholder="Type Here To Search Images"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleQueryChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className={classes.loadingWrapper}>
                <ImageSearchIcon />
                {loading && <CircularProgress className={classes.progress} size={32} thickness={2} />}
              </div>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
