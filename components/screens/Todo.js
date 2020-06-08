import React from 'react';
import {List} from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firebase from '../../fb';

function Todos({doc}) {
	const swipeSettings={
		autoClose: true,
		right: [{
			onPress:  ()=> {
				deleted(doc.key)
			},
			type: 'Delete',
			text: 'Delete'
		}]
	}
	function deleted(key){
		firebase.database().ref().child(doc.key).remove()
	}

	async function toggleComplete(){
		await firebase.database().ref().child(doc.key).update({complete: !doc.val().complete })
		console.log(doc.key)
	} 

	return (
		<Swipeout {...swipeSettings}>
		<List.Item 
			title={doc.val().title}
			description={doc.val().description}
			onPress={()=> toggleComplete()}
			style={{
				flex:1,
			}}
			left={props=>  (
				<List.Icon {...props} icon={doc.val().complete ? 'check' : 'cancel'}/>
			)}
		/>
		</Swipeout>
	)
}

export default Todos;