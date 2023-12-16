import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomTable from "./components/CustomTable";
import { CustomSearchInput } from "./components";
import { columns } from "./constants/global";

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemoData, setPokemoData] = useState([])
  const [filtredPokemon, setFiltredPokemon] = useState([])
  const [maxPower, setMaxPower] = useState(0)
  const [minPower, setMinPower] = useState(0)


  const handleSearch = (e) => {
    const filtredData = pokemoData.filter((pokemon) => pokemon.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFiltredPokemon(filtredData);
  }
  const handleFilter = (e) => {
    const value = e.target.value;
    const filtredData = pokemoData.filter((pokemon) => pokemon.power >= value);
    setFiltredPokemon(filtredData);
  };
  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/pokemon.json')
      setPokemoData(data.map(transformedData))
      setFiltredPokemon(pokemoData)
    } catch (error) {
      console.error('request data error', error)
    } finally {
      setLoading(false)
    }
  }
  // Add power values to Pokemon data
  const transformedData = (item) => ({
    ...item,
    power: item.hp +
      item.attack +
      item.defense +
      item.special_attack +
      item.special_defense +
      item.speed
  })
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setFiltredPokemon(pokemoData)
  }, [pokemoData])
  if (loading) return <Typography variant="h1"> Loading...</Typography>
  return <Paper sx={{ p: '20px 40px' }}>
    <Box
      sx={{
        mb: 10,
        p: '5px 10px',
        borderRadius: 4,
        boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.75)',
      }}>
      <Box sx={{
        display: 'flex',
      }}>

        <CustomSearchInput placeholder='Search...'
          icon={<SearchIcon />} onChange={handleSearch} />
        <CustomSearchInput type="number" placeholder='Power threshold'
          icon={<FavoriteBorderIcon />}
          onChange={handleFilter} />
      </Box>

      <Box sx={{ ml: 1, }}>
        <Typography>Min Power: {isFinite(minPower) ? minPower : 0} </Typography>
        <Typography>Max Power: {isFinite(maxPower) ? maxPower : 0} </Typography>
      </Box>
    </Box>
    <CustomTable
      rows={filtredPokemon}
      columns={columns}
      setMaxPower={setMaxPower}
      setMinPower={setMinPower}
    />
  </Paper>;
}

export default App;
