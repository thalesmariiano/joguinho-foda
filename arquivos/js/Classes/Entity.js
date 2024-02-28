
class Entity {
	constructor({color, position}){
		this.sprite = new Image()
		this.color = color
		this.position = position
		this.initial_position = {
			x: this.position.x,
			y: this.position.y
		}
		this.width = 55
		this.height = 100
		this.velocity = {
			x: 0, 
			y: 0
		}
		this.entitySprites = null
		this.sprInfo = null
		this.imgX = 0
		this.imgY = 0
		this.frameSizeX = 0
		this.frameSizeY = 0
		this.currentFrames = 0
		this.spriteFrames = 0
		this.framesElapsed = 0
		this.framesHold = 5
		this.stopAnimation = false
		this.offest = {
			x: 0,
			y: 0
		}
		this.entitySizeX = 0
		this.entitySizeY = 0
		//
		this.isIdle = false
		this.isFalling = false
		this.isRunning = false
		this.isWalking = false
		this.isJumping = false
		this.isAttacking = false
		this.isShooting = false
		this.isDead = false
		this.receiveDamage = false
		this.entityAttacked = false
		//
		this.health = 100
		this.maxHealth = 100
		this.defaultSpeed = 5
		this.speed = 5
		this.jump = -13
		//
		this.visible = true
		this.type = "Entity"
		this.direction = "right"
		this.entityType = null
	}

	setSprites(sprArray){
		this.entitySprites = sprArray
	}

	switchSprite(name){
		const spr = this.entitySprites.find(sprite => sprite.name == name)

		if(spr !== this.sprInfo) this.currentFrames = 0	
		else return

		this.sprite = spr.image
		this.spriteFrames = spr.frames
		this.framesHold = spr.hold ? spr.hold : 5
		this.frameSizeX = this.sprite.width/this.spriteFrames
		this.frameSizeY = this.sprite.height
		this.sprInfo = spr
	}

	animation(){
		this.framesElapsed++
		if(this.framesElapsed % this.framesHold === 0){
			this.currentFrames++
			this.onAnimation({sprite: this.sprInfo, frame: this.currentFrames, frameHold: this.framesHold, framesElapsed: this.framesElapsed})
			if(this.currentFrames >= this.spriteFrames){					
				this.onAnimationEnd(this.sprInfo)
				if(this.stopAnimation) return
				this.currentFrames = 0
			}
		}
		this.imgX = this.frameSizeX*this.currentFrames
	}

	onAnimationEnd(){}
	onAnimation(){}

	runLeft(){
		this.velocity.x = -this.speed
		this.direction = "left"
		this.isRunning = true
	}

	runRight(){
		this.velocity.x = this.speed
		this.direction = "right"
		this.isRunning = true
	}

	jumpUp(){
		this.velocity.y = this.jump
		this.isJumping = true
		jump.play()
	}

	draw(){
		buffer.drawImage(this.sprite, this.imgX, this.imgY, this.frameSizeX, this.frameSizeY, this.position.x - this.offest.x, this.position.y - this.offest.y, this.entitySizeX, this.entitySizeY)

		if(developerMode){
			buffer.strokeStyle = "black"
			buffer.strokeRect(this.position.x, this.position.y, this.width, this.height)
		}
			
		// ctx.fillStyle = this.color
		// ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update(){
		this.draw()

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		this.velocity.y += GRAVITY

		// this.position.x = Math.max(1, Math.min(canvas.width - this.width - 2, this.position.x))
	}
}