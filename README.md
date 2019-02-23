JamSpace.TV

    About JamSpace.TV:

    LiveStreaming platform for musical performance & interaction.
    
      JamSpace is a live-streaming and interaction app built by musicians for
      musicians. We specifically cater to musicians that want to live stream
      their performances, lessons, or production to a virtual audience that can
      interact via a real-time chatroom.   
    
      While there are many streaming apps that exist, their music sections are
      usually buried below video-game streamers. We wanted to build an app as
      well as a culture for musicians so they can have a place to call their own
      in the fast evolving virtual world.
    

    Background:
    
      JamSpace was built by James Byrd, Dan Gilbert and Javier Carey as their
      capstone project prior to graduating from FullStack Academy's Remote
      Intensive Program in October 2018.   
    
      See our presentation:
      https://www.youtube.com/watch?v=qcCDYTLqq5w
    

    PLEASE NOTE:     
      
      The website works! If you setup an account and start a stream then
      anyone on the site could see you are live and then go see what you are
      streaming.
    
    
      Not that there's any traffic on the site, but some people would be mad
      if we didn't say explicitly somewhere that "hey - you're potentially
      broadcasting a stream to anyone!"
    
    
      The chat window works, so if you do catch someone streaming you could
      communicate to them via chat. Everyone else watching that stream will
      see all the same messages.
    
    
      For demo purposes, the BobbyD test account has been hard-coded to always
      appear online, but there's no one streaming on that channel.
    
    
      The website works best on the Chrome browser. We have not tested with
      other browsers.
      
    

    Core Technologies: 
    
      WebRTC / PeerJS - peer to peer video and data streaming
    
      Firebase - auth and data storage, and event hooks for getting realtime
      updates to back end data changes
      
      Semantic UI - front-end CSS
    

    Biggest Challenges:
      
      Understanding webRTC handshake process and handing off media streams      

      Understanding firebase concepts
      
      Trying to understand all of the above simultaneously
    

    Shout Outs:
    
      Muaz Kahn - webRTC muse 

      Omri Bernstein - resolving hours of troubleshooting with the letter 's' 

      Jessie De La Cruz Santos - suggesting PeerJS and general support

      Jack Lye - Morgan just use Firebase for everything!
 



    Team Members:

        
        James Byrd:

        https://www.jbprojectlab.com
        https://www.github.com/jbprojectlab
        https://www.linkedin.com/in/james-s-byrd
      

        Dan Gilbert:

        https://www.github.com/danglebert
        https://www.linkedin.com/in/d-gilbert
 

        Javier Carey:

        https://www.github.com/jav1jav
        https://www.linkedin.com/in/javiercarey
      
    



Setup:


MacOS/Linux --


npm install

npm start





Windows --


npm install

npm run build-watch to start the webpack process

Open another terminal window; from there, npm run start-server to start the server process



Push to production:

npm run build

firebase deploy
