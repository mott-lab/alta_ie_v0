import React, {Component} from 'react';
import './App.css';
import ReactTerminal, { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';

import {
  History, OutputFactory, Outputs, EmulatorState, FileSystem, CommandMapping, defaultCommandMapping, FileOp, EnvironmentVariables
} from 'javascript-terminal';

import * as logs from './logs';

// const fs = require('browserify-fs'); 


class App extends Component {

  render() {
    // const emulator = new Emulator();
    // let emulatorState = EmulatorState.createEmpty();
    // let defaultHistory = emulatorState.getHistory();
    

    // let textOutput = OutputFactory.makeTextOutput(`Hello there`);
    // let customOutputs = Outputs.create([textOutput]);
    // emulatorState.setOutputs(customOutputs);

    const defaultState = EmulatorState.createEmpty();
    const defaultHistory = defaultState.getHistory();

    const customHistory = History.recordCommand(defaultHistory, 'history -c');

    const WELCOME_TYPE = 'welcome';
    const ART_TYPE = 'art';

    const welcomeStyles = {
      color: 'lime',
      whiteSpace: 'normal',
      fontSize: '0.9rem',
      lineHeight: '1em'
    };

    const ASCIIArtStyles = {
      color: 'cyan',
      whiteSpace: 'pre',
      fontSize: '0.65rem',
      lineHeight: '0.65rem'
    }

    const ArtOutput = ({ content }) => (
      <div style={ASCIIArtStyles}>
       {content.body}
      </div>
    );

    const createArtRecord = (body) => {
      return new OutputFactory.OutputRecord({
        type: ART_TYPE,
        content: { body }
      });
    };

    const WelcomeOutput = ({ content }) => (
      <div style={welcomeStyles}>
       {content.body}
      </div>
    );

    const createWelcomeRecord = (body) => {
      return new OutputFactory.OutputRecord({
        type: WELCOME_TYPE,
        content: { body }
      });
    };
    
    let altaTitleArt = createArtRecord(
      `\
       ___           ___                     ___     
      /  /\\         /  /\\      ___          /  /\\    
     /  /::\\       /  /:/     /__/\\        /  /::\\   
    /  /:/\\:\\     /  /:/      \\  \\:\\      /  /:/\\:\\  
   /  /::\\ \\:\\   /  /:/        \\__\\:\\    /  /::\\ \\:\\ 
  /__/:/\\:\\_\\:\\ /__/:/         /  /::\\  /__/:/\\:\\_\\:\\
  \\__\\/  \\:\\/:/ \\  \\:\\        /  /:/\\:\\ \\__\\/  \\:\\/:/
       \\__\\::/   \\  \\:\\      /  /:/__\\/      \\__\\::/ 
       /  /:/     \\  \\:\\    /__/:/           /  /:/  
      /__/:/       \\  \\:\\   \\__\\/           /__/:/   
      \\__\\/         \\__\\/                   \\__\\/ 
   `);

    const altaWelcomeMsg0 = createWelcomeRecord(`ALTA Linguistic Transcription and Annotation device`);
    const altaWelcomeMsg1 = createWelcomeRecord(`Release: v12.12-beta`);
    const altaWelcomeMsg2 = createWelcomeRecord(`Fork: for use in Isolated Environments, v0.0`);
    const altaWelcomeMsg3 = createWelcomeRecord(`Booted in developer mode.`);
    
    const customOutputs = Outputs.create([altaTitleArt, altaWelcomeMsg0, altaWelcomeMsg1, altaWelcomeMsg2, altaWelcomeMsg3]);

    // const readTextFile = file => {
    //   var rawFile = new XMLHttpRequest();
    //   rawFile.open("GET", file, false);
    //   rawFile.onreadystatechange = () => {
    //       if (rawFile.readyState === 4) {
    //         if (rawFile.status === 200 || rawFile.status == 0) {
    //           var allText = rawFile.responseText;
    //           console.log("allText: ", allText);
    //           this.setState({
    //               fundData: allText
    //           });
    //         }
    //       }
    //   };
    //   rawFile.send(null);
    // };

    const createLogs = () => {
      let fsObj = {
        '/README.txt': {content: 'You are accessing your A.L.T.A. in developer mode. I sure hope you know what you are doing. Try not to break anything!', canModify: true},
        '/home': { },
        '/logs': { }
      };

      // for (let i = 0; i < 1; i++) {
        // let logname = process.env.PUBLIC_URL + '/logs/log-' + 0;
        // let f = readTextFile(logname);
        // console.log(f);
        // console.log(logname);
      // }
      // let logname = process.env.PUBLIC_URL;
      // fs.readdir(logname, 'utf-8', function(err, data) {
      //   console.log(err);
      //   console.log(data);
      // });

      for (let i = 0; i < logs.count; i++) {
        fsObj['/logs/log' + i] = { content: logs['log' + i]}
      }
      return fsObj;
    }

    const altaFSObj = createLogs();

    let altaFS = FileSystem.create(altaFSObj);

    const altaCommandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      'help': {
        
        'function': (state, opts) => {
          const helpOutput = `\
Available commands:
> cat [FILE1] [FILE2] ... : Output the contents of [FILE1], [FILE2], ... to terminal.
> cd [DIR]: Change working directory to [DIR].
> clear: Clear all terminal output.
> cp [SOURCE] [DEST]: Copy [SOURCE] file into [DEST], where [DEST] is a file or directory.
> echo [TEXT]: Output [TEXT] to terminal.
> head [FILE]: Output first lines of [FILE] to terminal. Run with -n <n> or --lines <n> to output the first <n> lines of [FILE].
> history: Display history of commands entered. Run with -c or --clear to clear history.
> ls: List the contents of the current working directory. Run with a directory name to list its contents.
> mkdir [DIR]: Create a folder named [DIR] in the current working directory.
> printenv: Print environment variables and associated values. Run with [ENV] to print the value of [ENV] environment variable.
> pwd: Print current working directory.
> rm [TARGET]: Delete [TARGET], a directory or file. Run with -r or --recursive if [TARGET] is a directory. Run with --no-preserve-root if deleting root directory (EXERCISE CAUTION).
> rmdir [DIR]: Delete [DIR], an empty directory.
> tail [FILE]: Output last lines of [FILE] to terminal. Run with -n <n> or --lines <n> to output the last <n> lines of [FILE].
> touch [FILE]: Create empty [FILE] in current working directory.
> whoami: Answer the critical question.

> help: Display available command info.
          `;
          
          return {
            output: createWelcomeRecord(helpOutput)
          };
        },
        'optDef': {}
      },
      'cat': {
        'function': (state, opts) => {
          const fileToTextOutput = (fs, filePath) => {
            const {err, file} = FileOp.readFile(fs, filePath);
            if (err) {
              return OutputFactory.makeErrorOutput(err);
            };
          
            return createWelcomeRecord(file.get('content'));
          };
          if (opts.length === 0) {
            return {};
          }

          const cwd = EnvironmentVariables.getEnvironmentVariable(state.getEnvVariables(), 'cwd');

          return {
            outputs: opts.map(path => fileToTextOutput(state.getFileSystem(), cwd + path))
          };
        },
        'optDef': {}
      }
    });
    
    const defaultEnvVariables = defaultState.getEnvVariables();
    const altaEnvVariables = EnvironmentVariables.setEnvironmentVariable(
      defaultEnvVariables, 'user', 'no_one'
    );
      
    const emulatorState = defaultState
                          .setHistory(customHistory)
                          .setOutputs(customOutputs)
                          .setFileSystem(altaFS)
                          .setEnvVariables(altaEnvVariables)
                          .setCommandMapping(altaCommandMapping);


    // FileOp.writeFile(emulatorState.getFileSystem(), resolvePath(emulatorState, ''), FileUtil.makeFile());
    


    return (
      <div className="App">
        <ReactTerminal 
          emulatorState={emulatorState}
          outputRenderers={{
            ...ReactOutputRenderers,
            [WELCOME_TYPE]: WelcomeOutput,
            [ART_TYPE]: ArtOutput
          }}
          theme={{
            ...ReactThemes.hacker, 
            height: '100vh', 
            spacing: '0',
            fontSize: '0.9rem'
          }}
          promptSymbol=">"
          clickToFocus
          className="term" />
      </div>
    );
  }
}

export default App;
