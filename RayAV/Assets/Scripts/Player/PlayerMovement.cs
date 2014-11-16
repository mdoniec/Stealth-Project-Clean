using UnityEngine;
using System.Collections;

public class ExampleClass : MonoBehaviour {
	
	
	
	void Update() {
		
		if (rigidbody.velocity  != new Vector3(0, 0, 0)  ){
			if(!audio.isPlaying)
				audio.Play();	
			
		}
		else
			audio.Stop();
		
	}
}