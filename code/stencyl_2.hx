
/* ======================== When Updating ========================= */
addWhenUpdatedListener(null, function(elapsedTime:Float, list:Array<Dynamic>):Void
{
	if(wrapper.enabled)
	{
		actor.setXVelocity(0);
		if(isKeyDown("right"))
		{
			actor.setXVelocity(20);
		}
		else if(isKeyDown("left"))
		{
			actor.setXVelocity(-20);
		}
	}
});
