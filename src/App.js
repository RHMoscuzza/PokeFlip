import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(){
	const [data, setData] = useState([]);
	const [isToggled, setIsToggled] = useState({});

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

	const toggleTrueFalse = (key) => {
		return (e) => {
			setIsToggled({...isToggled, [key]: !isToggled[key]})
		}
	}

	return (
		<div>
			<header>
				<h1>PokeFlip</h1>
			</header>
			<ul>
				{data && data.map((item, index) => (
					<li key={item.name} id={index}>

						<h5 className="pokeId" >{item.id}</h5>
						<h3 className="pokeName">{item.name.replace('-f', String.fromCharCode(0x00002640)).replace('-m', String.fromCharCode(0x00002642))}</h3>
						{!isToggled[item.name] ? (
							<div className="flipCard frontCard" >
								<img src={item.sprites.front_default} alt=""/>
							</div>
							) :	(
							<div className="flipCard backCard" >
								<p key={index} className="pokeType">Type:&nbsp;{
									item.types.map((singleType, i) => (
										<span key={singleType.type.name} style={
											singleType.type.name === 'grass' ? {color: 'green'} : {color: ''} &&
											singleType.type.name === 'fire' ? {color: 'red'} : {color: ''} &&
											singleType.type.name === 'water' ? {color: 'blue'} : {color: ''} &&
											singleType.type.name === 'ground' ? {color: 'brown'} : {color: ''}  &&
											singleType.type.name === 'poison' ? {color: 'purple'} : {color: ''}  
										}>{singleType.type.name}&nbsp;</span>
									))
								}
								</p>
								<p>Height: {(item.height / 10).toFixed(2)}m</p>
							<p>Weight: {item.weight / 10}kg</p>
								<p>Ability: {item.abilities[0].ability.name}</p>
								<p>Base Exp: {item.base_experience}</p>
							</div>)
						}
						<button className='flipButton' onClick={toggleTrueFalse(item.name)}>{!isToggled[item.name] ? `More Stats` : `Less Stats`}</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
