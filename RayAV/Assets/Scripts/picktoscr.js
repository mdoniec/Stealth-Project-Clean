

#pragma strict
var objectPos : Vector3;

var strength : int = 10;

var objectRot : Quaternion;

var pickObj : GameObject;

var canpick = true;

var picking = false;

var guipick = false;

var pickref : GameObject;

var currentdistance : float ;

var pickdistance : float ;

var emptyj : GameObject;

var parentjoint : FixedJoint;

function Start () {

pickref = GameObject.FindWithTag ("pickupref");
emptyj = GameObject.FindWithTag ("emptyjoint");
pickObj = pickref;

}
function Update () {
var raycheck: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);

var hitcheck: RaycastHit;

if (Physics.Raycast(raycheck, hitcheck,15) && hitcheck.collider.gameObject.tag == "pickup"){ guipick = true;

} 

if (Physics.Raycast(raycheck, hitcheck) && hitcheck.collider.gameObject.tag != "pickup"){ guipick = false;

}

objectPos = transform.position;

objectRot = transform.rotation;

if(Input.GetMouseButtonDown(0) && canpick && guipick){
picking = true;
var ray:Ray=Camera.main.ScreenPointToRay(Input.mousePosition);
var hit: RaycastHit;


//PICKUP
if (Physics.Raycast(ray, hit, 6) && hit.collider.gameObject.tag == "pickup")
{ pickObj = hit.collider.gameObject;
 hit.rigidbody.useGravity = false;
 
 
//pickObj.rigidbody.AddForce (transform.forward * 300);
// hit.rigidbody.isKinematic = true; 

//angle = Vector3.Angle(gameObject.transform.position,pickObj.transform.position) ;
//hit.transform.position= gameObject.transform.position;

 parentjoint = transform.parent.GetComponent(FixedJoint);
 parentjoint.connectedBody= hit.rigidbody;
 //hit.transform.parent = gameObject.transform.parent.transform.parent.transform; 
 
 //hit.rigidbody.constraints = RigidbodyConstraints.FreezePositionX |RigidbodyConstraints.FreezePositionY | RigidbodyConstraints.FreezePositionZ ;
 //hit.rigidbody.constraints = RigidbodyConstraints.FreezePosition ;
pickdistance = Vector3.Magnitude(gameObject.transform.position-pickObj.transform.position);
 // hit.rigidbody.constraints = RigidbodyConstraints.FreezeRotation ;

 //hit.transform.rotation = objectRot;

}

} 



//THROW
if(Input.GetMouseButtonUp(0) && picking){
picking = false;
canpick = false;
}
if(Input.GetMouseButtonDown(0) && !canpick && pickObj.GetComponent(pickedupobj).refusethrow !=true)
{
canpick = true; 
pickObj.rigidbody.constraints = RigidbodyConstraints.None;
pickObj.rigidbody.useGravity=true;
pickObj.rigidbody.isKinematic = false;
pickObj.transform.parent = null;
pickObj.collider.isTrigger = false;
pickObj.rigidbody.AddForce (transform.right * strength);
 pickObj = pickref;
 
 parentjoint.connectedBody = emptyj.rigidbody;


}


currentdistance = Vector3.Magnitude(gameObject.transform.position-pickObj.transform.position) ;


// RELEASE
if((Input.GetMouseButtonDown(1)  || Mathf.Abs(currentdistance-pickdistance)>0.4 || Vector3.Magnitude(gameObject.transform.parent.transform.position-pickObj.transform.position)<0.3 )
&& !canpick && pickObj.GetComponent(pickedupobj).refusethrow !=true) 


{ canpick = true; 
pickObj.rigidbody.useGravity=true;
pickObj.rigidbody.isKinematic = false;
pickObj.rigidbody.constraints = RigidbodyConstraints.None ;
pickObj.transform.parent = null;

pickObj.collider.isTrigger = false; pickObj = pickref;
 parentjoint.connectedBody = emptyj.rigidbody;
}

}

function OnGUI () {

if (guipick && canpick){
GUI.Label (Rect (Screen.width/2,Screen.height/2,Screen.width/2,Screen.height/2), "Pick Up");
}
}