import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(){
	const [data, setData] = useState([]);
	const [isToggled, setToggle] = useState(false);
	const [toggleID, setToggleID] = useState([])
	
	useEffect(() => {
		const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=151`;
		
		async function fetchData() {
			const result = await axios 
			.get(baseUrl) 
			.then((res) => {
				return res.data.results
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)))
			})
			.then((results) => {
				setData(results.map((res) => res.data))
			})
		}
		
		fetchData();
		
	}, []);

	const toggleTrueFalse = (index) => {
		// console.log(data.name)
		// if(`button.`+data.name == index.target) {
			console.log(index.target)
			
		// }

	}
	
	return (
		<div>
			<header>
				<h1>PokeFlip</h1>
			</header>
			<ul>
				{data.map((item, index) => (
					<li key={item.name} id={index}>
						
						<h5 className="pokeId" >{item.id}</h5>
						<h3 className="pokeName">{item.name.replace('-f', ' ♀').replace('-m', ' ♂')}</h3>
						<> {!isToggled ? 
							<div className="flipCard frontCard" >
								<img src={item.sprites.front_default} alt=""/>
							</div> :
							<div className="flipCard backCard" >
								<p key={index} className="pokeType">Type:&nbsp;{
									item.types.map((singleType, i) => {
										return (<span key={i} >{singleType.type.name}&nbsp;</span>)
									})
								}
								</p>
								<p>Height: {(item.height/10).toFixed(2)}m</p>
							<p>Weight: {item.weight/10}kg</p>
								<p>Ability: {item.abilities[0].ability.name}</p>
								<p>Base Exp: {item.base_experience}</p>
							</div>
						}</>
						<button className={item.name} onClick={(e) => {
							if(item.id === index + 1) {
								// setToggleID(item.id);
								// console.log(item.id)
								console.log(item.id, index + 1)
								setToggle(!isToggled);
							} else {
								console.log('nope')
							}
						}}>{!isToggled ? `More Stats` : `Less Stats`}</button>
					</li>
				))}
				
			</ul>
		</div>
	);
}
		
export default App;
		