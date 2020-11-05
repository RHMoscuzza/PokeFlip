import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(){
	const [data, setData] = useState([]);
	
	useEffect(() => {
		const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=151`;
		
		const fetchData = async () => {
			const result = await axios
			.get(baseUrl)
			.then((res) => {
				return res.data.results
			})
			.then((results) => {
				return Promise.all(results.map((res) => {
					return axios.get(res.url);
				}))
			})
			.then((results) => {
				return results.map((res) => res.data)
			})
			setData(result);
		}
		
		fetchData();
		
	}, []);
	
	return (
		<div>
			<header>
				<h1>PokeFlip</h1>
				<h3>Hover over a card for more Pokemon stats</h3>
			</header>
			<ul className="cardWrapper">
			{data && data.map((item, index) => (
				<li key={item.name} id={index} className="listItemCard">
				
					<h5 className="pokeId" >{item.id}</h5>
					<h3 className="pokeName">{item.name.replace('-f', String.fromCharCode(0x00002640)).replace('-m', String.fromCharCode(0x00002642))}</h3>
					<div className="cardFlipWrapper">
						<div className="flipCard frontCard">
							<img src={item.sprites.front_default} alt=""/>
						</div>
					
						<div className="flipCard backCard">
							<p key={index} className="pokeType">Type:&nbsp;{
							item.types.map((singleType, i) => (
								<span key={singleType.type.name} style={
									singleType.type.name === 'grass' ? {color: '#2aa252'} : {color: ''} &&
									singleType.type.name === 'fire' ? {color: '#ca2e16'} : {color: ''} &&
									singleType.type.name === 'water' ? {color: '#2083D5'} : {color: ''} &&
									singleType.type.name === 'ground' ? {color: '#815E5B'} : {color: ''}  &&
									singleType.type.name === 'poison' ? {color: '#996f9b'} : {color: ''}  &&
									singleType.type.name === 'bug' ? {color: '#98a040'} : {color: ''} &&
									singleType.type.name === 'flying' ? {color: '#7B5D28'} : {color: ''} &&
									singleType.type.name === 'electric' ? {color: '#C1BA33'} : {color: ''} &&
									singleType.type.name === 'psychic' ? {color: '#5a52a3'} : {color: ''} &&
									singleType.type.name === 'rock' ? {color: '#364345'} : {color: ''} &&
									singleType.type.name === 'ghost' ? {color: '#1B1F22'} : {color: ''} &&
									singleType.type.name === 'dragon' ? {color: '#c95d63'} : {color: ''} &&
									singleType.type.name === 'dark' ? {color: '#0b1004'} : {color: ''} &&
									singleType.type.name === 'steel' ? {color: '#393e41'} : {color: ''} &&
									singleType.type.name === 'fairy' ? {color: '#D9595F'} : {color: ''} &&
									singleType.type.name === 'fighting' ? {color: '#4E5155'} : {color: ''} &&
									singleType.type.name === 'ice' ? {color: '#467C9B'} : {color: ''}
								}>{singleType.type.name}&nbsp;</span>
							))}
							</p>
							<p>Height: {(item.height / 10).toFixed(2)}m</p>
							<p>Weight: {item.weight / 10}kg</p>
							<p>Ability: {item.abilities[0].ability.name}</p>
							<p>Base Exp: {item.base_experience}</p>
						</div>
					</div>
					
				</li>
			))}
			</ul>
		</div>
	);
}
				
export default App;
				