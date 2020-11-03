import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(){
	const [data, setData] = useState([]);
	const [isToggled, setIsToggle] = useState({});

	useEffect(() => {
		const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=151`;

		const fetchData = async () => {
			const result = await axios
			.get(baseUrl)
			.then((res) => {
				return res.data.results
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)))
			})
			.then((results) => {
				return results.map((res) => res.data)
			})

			setData(result);
		}

		fetchData();

		// I wrote my own fetch using fetch function (fetch is built-in as opposed to axios)
		//
		// fetch(baseUrl)
		// 	.then(response => response.json())
		// 	.then(({results}) => {
		// 		// used your technique for returning promises, but instead
		// 		// i use the function that fetches the additional data
		// 		// to construct my objects
		// 		return Promise.all(results.map(item => fetchAdditionalData(item)))
		// 			.then((values) => {
		// 				setData(values);
		// 			})
		// 	})
	}, []);

	// used to fetch additional data
	// const fetchAdditionalData = ({ name, url}) => {
	// 	return fetch(url)
	// 		.then(response => response.json())
	// 		.then(json => {
	// 			// construct the object to be added to the data arr
	// 			return { name, url, ...json }
	// 		});
	// }

	const toggleTrueFalse = (key) => {
		return (e) => {
			// we do this to test if the key exists in the object, which if it does
			// will result in undefined (falsey value)
			// as a result we are able to store the individual state of each tile
			setIsToggle({ ...isToggled, [key]: !isToggled[key] })
		}
	}

	return (
		<div>
			<header>
				<h1>PokeFlip</h1>
			</header>
			<ul>
				{data && data.map((item, index) => 
					<li key={item.name} id={index}>
						<h5 className="pokeId" >{item.id}</h5>
						<h3 className="pokeName">{item.name.replace('-f', ' ♀').replace('-m', ' ♂')}</h3>
						{!isToggled[item.name] ? (
							<div className="flipCard frontCard" >
								<img src={item.sprites.front_default} alt="" />
							</div>
						) : (
							<div className="flipCard backCard" >
								<p key={index} className="pokeType">Type:&nbsp;{
									item.types.map((singleType) => (
										<span key={singleType.type.name}>{singleType.type.name}&nbsp;</span>
									))
								}
								</p>
								<p>Height: {(item.height / 10).toFixed(2)}m</p>
								<p>Weight: {item.weight / 10}kg</p>
								<p>Ability: {item.abilities[0].ability.name}</p>
								<p>Base Exp: {item.base_experience}</p>
							</div>
						)}
						<button className='flipButton' onClick={toggleTrueFalse(item.name)}>{!isToggled[item.name] ? `More Stats` : `Less Stats`}</button>
					</li>
				)}
			</ul>
		</div>
	);
}

export default App;
