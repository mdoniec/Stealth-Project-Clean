#pragma strict
var moveAcc = 20;
var maxSpeed = 120;
var JumpForce =200;


var runForce = 0;
var looper=0;
var cycle = 20;
function Start () {

}

function Update () {

Screen.lockCursor = true;

Screen.lockCursor = false;

Screen.showCursor = false;


//rigidbody.AddForce(Vector3.right * moveSpeed);
//move forward


if ((Input.GetAxis ("Vertical")!=0 || Input.GetAxis ("Horizontal")!=0) && looper>=cycle){
rigidbody.AddForce(Vector3(0,rigidbody.velocity.magnitude*runForce,0));
looper=0;
}



// MOVEMENT
if (rigidbody.velocity.magnitude*100<maxSpeed){
looper=looper+1;
if (Input.GetAxis ("Vertical")>0){
rigidbody.AddForce(Vector3(transform.forward.x * moveAcc,0,transform.forward.z * moveAcc));

}

//move "backward"
if (Input.GetAxis("Vertical")<0){
rigidbody.AddForce(Vector3(-transform.forward.x * moveAcc/2,0,-transform.forward.z * moveAcc/2));
}

// move left
if (Input.GetAxis ("Horizontal")<0){
rigidbody.AddForce(Vector3(-transform.right.x * moveAcc/1.4,0,-transform.right.z * moveAcc/1.4));
}


//move right
if (Input.GetAxis ("Horizontal")>0){
rigidbody.AddForce(Vector3(transform.right.x * moveAcc/1.4,0,transform.right.z * moveAcc/1.4));
}
}

//JUMPING
if (Mathf.Abs(rigidbody.velocity.y)<0.1){

if (Input.GetKey("space"))   {
rigidbody.AddForce(transform.up*JumpForce);
}

}

}