import React from 'react';
import { NavLink } from "react-router-dom";

import './App.css';

class Home extends React.Component {

render() {
  return (
    <div className="Home">
      <h1>the alta files</h1>
      <br />
      <hr />
      <h3>2020-05-29</h3>
      <p>
        I found a weird data stream on the Internet. Well, I'm not sure if "on the Internet" is the way to describe it. There's this antenna that my friend Don and I have been tinkering with for a while. We started out wanting to understand how signals work at a low level. My friend built the thing (I'm not much of a hardware guy), and we work together on the signal processing. A few days ago, we started picking up some signals that we haven't seen documented before. We haven't been able to trace their physical emitter. We are still novices when it comes to those particular network measurements, though, so maybe someone who is better at that stuff can figure it out. I'm just going to focus on the data itself for now and for the foreseeable future.
      </p>
      <p>
        The signal form isn't like anything we have seen before...I guess that isn't saying much because we are hardly signal processing experts, but some googling tells us it also isn't like anything the Internet has seen before. It looks weird to us at a ~fundamental~ level. It seems like it isn't binary...we can't find an existing protocol to code the raw data into just ones and zeroes--at least, not yet. It's completely functional? I'm not sure if that's the right word for it. I'm still searching for a way to describe the form of information we are sensing. 
      </p>
      <br />
      <hr />
      <h3>2020-06-09</h3>
      <p>
        Okay, we've managed to throw together a protocol to interpret these signals. It does not feel like a very robust protocol, but Don seems to think it will hold up. He did most of the work on it, so I trust him. This protocol is like a lens into this underlying signal, right?
      </p>
      <p>
        I'm just having a hard time coming to terms with what this lens is showing us. 
      </p>
      <br />
      <hr />
      <h3>2020-06-11</h3>
      <p>
        We haven't gotten anywhere useful with this data. I think I am spiraling out of reality the more I keep this between just the two of us. Don thinks I am insane for doing this, but I wanted to publish this on the Internet in the hopes that someone else can provide some insight or at least share my fascination. 
      </p>
      <p>
        The data seems like it is a set of files on someone's computer. It's always changing and feels like the computer itself could crash, but it also feels beautifully stable. I have been able to open a connection to the source through an emulated computer terminal. It's not a complete terminal by any means, but thanks to <a href="https://github.com/rohanchandra/react-terminal-component/">rohanchandra</a>, I was able to spin up a simple version pretty quickly. It feels like the purest way to share this information right now. It doesn't look like a pretty squarespace website, but it is certainly not supposed to because it is mostly log files. All will be left as plaintext, but I might add some higher level enrichment to the data over time as this thing develops. You'll see when you access the files.
      </p>
      <p>
        All the data is timestamped, and it aligns with present days and times. But here's the thing: the year is stamped 64 years from now.
      </p>
      <p>
        I think I found a wormhole that opens to some future slice of space-time. I don't know how we found it, but I am trying to find out what I can do with it. Other people are going to have to find out how we got to it, where it physically is, whose it is, etc. All that isn't my specialty. I'm more on the human/software side.
      </p>
      <p>
        I know it's crazy. Just pick up the data. It might become clearer if you start working with it. More than anything, I want someone to convince me that this is not what I think it is.
      </p>
      <p>
        It's like we can open an SSH tunnel into the future. Maybe the other terminal is in a location around me, maybe it's not. Thinking about what physical location means when trying to consider the time dimension is a bit too much for me right now, so I'll leave it at that.
      </p>
      <p>
        If you've used a computer command line application before, you will be able to figure things out quickly and will likely be disappointed by the lack of terminal features you're used to (sorry). If you haven't, type `help` to get a list of commands. The ones you will use most are:
      </p>
      <table>
        <thead>
          <tr>
            <th>command</th>
            <th>meaning/function</th>
            <th>example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ls</td>
            <td>list files and directories</td>
            <td>`ls` lists the contents of the current directory you are working in. `ls logs` lists the contents of the <b>logs</b> directory.</td>
          </tr>
          <tr>
            <td>cd</td>
            <td>change directory (folder)</td>
            <td>`cd logs` changes the working directory to the <b>logs</b> directory. `cd ..` changes the working directory to the current directory's parent directory.</td>
          </tr>
          <tr>
            <td>pwd</td>
            <td>print working directory</td>
            <td>`pwd` prints the directory you are currently working in. This command can be a useful sanity check as you navigate the hierarchical file structure.</td>
          </tr>
          <tr>
            <td>cat</td>
            <td>output file contents</td>
            <td>`cat log_0000` will output the contents of <b>log_0000</b> to the terminal.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Click on the terminal tab at the top of the screen to begin.
      </p>
      <p>
        Maybe someone reading this can find something I can't. As always, feedback and collaboration ideas are appreciated. Feel free to ping me.
      </p>
    </div>
  );
  }
}

export default Home;