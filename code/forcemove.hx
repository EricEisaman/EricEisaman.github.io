/* ======================== When Updating ========================= */
addWhenUpdatedListener(null, function(elapsedTime:Float, list:Array<Dynamic>):Void
{
	if(wrapper.enabled)
	{
		actor.setXVelocity((actor.getXVelocity() * 0.99));
		actor.setYVelocity((actor.getYVelocity() * 0.99));
		if(isKeyDown("right"))
		{
			actor.pushInDirection(0, 20);
		}
		else if(isKeyDown("down"))
		{
			actor.pushInDirection(90, 20);
		}
		else if(isKeyDown("left"))
		{
			actor.pushInDirection(180, 20);
		}
		else if(isKeyDown("up"))
		{
			actor.pushInDirection(270, 20);
		}
	}
});
