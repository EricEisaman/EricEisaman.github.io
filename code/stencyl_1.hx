/* ======================== When Updating ========================= */
addWhenUpdatedListener(null, function(elapsedTime:Float, list:Array<Dynamic>):Void
{
	if(wrapper.enabled)
	{
		__.setXVelocity(0);
		if(isKeyDown("right"))
		{
			__.setXVelocity(20);
		}
		else if(isKeyDown("left"))
		{
			__.setXVelocity(-20);
		}
	}
});
