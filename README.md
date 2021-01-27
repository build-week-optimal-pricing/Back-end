<h2>AirPrice</h2>
<ins>Deployed Landing Page:</ins> <b>https://rg-optimalpricer.netlify.com/index.html</b><br/>
<ins>Deployed Client:</ins> <b>https://airprice.now.sh/</b><br/>
<ins>Backend Deploy:</ins> <b>https://price-op.herokuapp.com/</b><br/>

<p>AirPrice is a tool that airbnb hosts in Berlin can use to determine the optimal price for their rental. This app consists of a landing page, react client app, node express backend, and a python API that performed data science magic.</p>

<h2>What I learned</h2>

In this project I built the API as the sole back-end developer at the end of my last core curriculum unit at Lambda School. It was my first big back-end project using node-express. During my previous build weeks working in front-end I noticed that it was common for teams to stagnate due to the back-end not being deployed/working on time to receive routes. I worked around that by just using dummy data, but as the back-end dev I didn't want that to be the case for my team. Gratefully I was able to provision the API for them and we built a successful project. 

My role involved receiving requests from a front-end then parsing them through to a separate data science API as well as a postgres database. We actually didn't learn either of these things during the unit(the unit taught us sqlite and just using routes to receive but not send requests) but I wanted a challenge and had anticipated needing postgres. So I picked it up during the unit separately in my own studies. 

The architecture became messier than I would have wanted (but I just learned this stuff at the time, ok!) and I had routes that would deal with both persisting in postgres as well as retrieving data from the DS Flask API. 

This team was also really enthused about the work and I had a great time building this. This was my favorite team project because of the people, the autonomy I had as the sole back-end dev, having to learn new things on the fly, and being the connecting piece between separate parts all made it a whole lot of fun! 

<h2>Technologies Used</h2>
<ins>API:</ins> <br />
    "axios": "^0.19.2",<br/>
    "bcryptjs": "^2.4.3",<br/>
    "cors": "^2.8.5",<br/>
    "express": "^4.17.1",<br/>
    "helmet": "^3.21.2",<br/>
    "jsonwebtoken": "^8.5.1",<br/>
    "knex": "^0.20.8",<br/>
    "knex-cleaner": "^1.3.0",<br/>
    "morgan": "^1.9.1",<br/>
    "pg": "^7.18.1"<br/>

---

### Development Team

**FrontEnd[Landing Page]:**

	Rudy Goldhaber[UI Developer]
	

**FrontEnd[React]:**

	Richard Wang[FrontEnd Developer]
	Vincent Sanders[Lead FrontEnd Developer]
	Edwin Chajon[Lead FrontEnd Developer]
	

**BackEnd[NodeJS]:**

	XuHui Zhu[BackEnd Developer]
	
	
**DataScience[Python]:**

	Patrick Wolf[Data Scientist]
	Daanish Rasheed[Data Scientist]
	Erik Cowley[Data Scientist]
	Zoltan Gaspar[Data Scientist]
	
---
