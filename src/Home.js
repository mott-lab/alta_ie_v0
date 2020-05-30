import React from 'react';

import './App.css';

class Home extends React.Component {

render() {
  return (
    <div className="Home">
      <h1>the alta files</h1>
      <hr />
      <h3>2020-05-29</h3>
      <p>
        I found a weird data stream on the Internet. Well, I'm not sure if "on the Internet" is the way to describe it...I set up an antenna that I've been tinkering with for a while, and I modified it to preserve some of the data it catches as sound, which lets me do some interesting analysis. I started picking up some signals that I haven't seen before, and that I haven't been able to trace. I'm a novice when it comes to network measurements, though, so maybe someone who is better at that stuff can figure it out. I'm just going to focus on the data.
      </p>
      <p>
        The data format isn't like anything I've seen before...I guess that isn't saying much because I am hardly a data scientist, but some googling tells me it also isn't like anything the Internet has seen before. It looks weird to me at a ~fundamental~ level. It seems like it isn't binary. The data is not ones and zeroes. It's completely functional? I'm not sure if that's the right word for it. Still trying to figure this stuff out. I'll keep searching for a way to describe the form of information I'm sensing. 
      </p>
      <p>
        I am struggling to interpret what all this means and where exactly it is coming from, so I wanted to publish something in the hopes that someone else can provide some insight or at least share my fascination. The data seems like it is a set of files on someone's computer. It's always changing and feels like the computer itself could crash, but it also feels beautifully stable. I can open a connection to the data through an emulated computer terminal. It's not a complete terminal by any means, but thanks to <a href="https://github.com/rohanchandra/react-terminal-component/">rohanchandra</a>, I was able to spin up a simple version pretty quickly. It feels like the purest way to share this information right now. It doesn't look like a squarespace website, but it is certainly not supposed to--it's mostly log files. All will be left as plaintext, but I might add some higher level enrichment to the data over time as this thing develops. You'll see when you access the files.
      </p>
      <p>
        All the data is timestamped, and it aligns with present days and times. But here's the thing: the year is stamped 128 years from now.
      </p>
      <p>
        I think I found a wormhole that opens to some future slice of spacetime. I don't know how I found it, but I am trying to find out what I can do with it. Other people are going to have to find out how I got to it, where it physically is, whose it is, etc. All that isn't my specialty. I'm more on the human/software side.
      </p>
      <p>
        I know it's crazy. Just pick up the data. It might become clearer if you start working with it. More than anything, I want someone to convince me that this is not what I think it is.
      </p>
      <p>
        It's like we can open an SSH tunnel into a hundred years from now. Maybe it's in a location around me, maybe it's not. Thinking about what physical location means when trying to consider the time dimension is a bit too much for me right now, so I'll leave it at that.
      </p>
      <p>
        If you've used a computer command line application before, you will be able to figure things out quickly and will likely be disappointed by the lack of terminal features you're used to. If you haven't, type `help` to get a list of commands. The ones you will use most are:
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
            <td>change directory</td>
            <td>`cd logs` changes the working directory to the <b>logs</b> directory.</td>
          </tr>
          <tr>
            <td>cat</td>
            <td>output file contents</td>
            <td>`cat log_0000` will output the contents of <b>log_0000</b> to the terminal.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Click on the <a href="./terminal">terminal tab</a> to begin.
      </p>
      <p>
        Maybe someone reading this can find something I can't. As always, feedback and collaboration ideas are appreciated. Feel free to ping me.
      </p>
    </div>
  );
  }
}

export default Home;