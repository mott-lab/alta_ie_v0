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

    const NORMOUT_TYPE = 'normout';
    const ART_TYPE = 'art';
    const CATLOG_TYPE = 'catlog';

    const normOutStyles = {
      color: 'lime',
      whiteSpace: 'normal',
      fontSize: '1rem',
      lineHeight: '1rem',
      fontFamily: 'Ubuntu Mono, monospace'
    };

    const ASCIIArtStyles = {
      color: 'cyan',
      whiteSpace: 'pre',
      fontSize: '0.85rem',
      lineHeight: '0.85rem',
      fontFamily: 'Ubuntu Mono, monospace'
    }

    const catLogStyles = {
      color: '#0ff9',
      whiteSpace: 'normal',
      fontSize: '1rem',
      lineHeight: '1rem',
      fontFamily: 'Ubuntu Mono, monospace'
    }

    const ArtOutput = ({ content }) => (
      <div style={ASCIIArtStyles}>
       {content.body}
      </div>
    );

    const CatLogOutput = ({ content }) => (
      <div>
        <div style={catLogStyles}>
          {/* <a href="https://google.com">CLICK</a> */}
          {content.pre}
        </div>
        <div style={normOutStyles}>
          {content.body}
        </div>
      </div>
    );

    const createArtRecord = (body) => {
      return new OutputFactory.OutputRecord({
        type: ART_TYPE,
        content: { body }
      });
    };

    const NormOutput = ({ content }) => (
      <div style={normOutStyles}>
       {content.body}
      </div>
    );

    const createNormOutRecord = (body) => {
      return new OutputFactory.OutputRecord({
        type: NORMOUT_TYPE,
        content: { body }
      });
    };

    const createCatLogRecord = (pre, body) => {
      return new OutputFactory.OutputRecord({
        type: CATLOG_TYPE,
        content: { pre, body }
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

    const altaWelcomeMsg0 = createNormOutRecord(`ALTA Linguistic Transcription and Annotation device`);
    const altaWelcomeMsg1 = createNormOutRecord(`Release: v12.12-beta`);
    const altaWelcomeMsg2 = createNormOutRecord(`Fork: for use in Isolated Environments, v0.1`);
    const altaWelcomeMsg3 = createNormOutRecord(`Booted in developer mode.`);
    
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

      const altaConfigContent = `{
  "LOG_STOP_TAG" : "STOP",
  "LOG_DEBUG_TAGS" : true,
  "USE_TRANSCRIPTION" : true,
  "USE_HYPERLINKING" : true,
  "USE_BASIC_GRAMMAR" : true,
  "USE_INTENT_CAPTURE" : true,
  "USE_INTENT_ENHANCED_GRAMMAR" : true,
  "USE_CUSTOM_MODELS" : false,
  "CUSOM_MODEL_DIR" : NULL,
  "SAFEMODE" : true
}`;

      const altaConfigOverrides = `{
  "LOG_STOP_TAG" : "\\b.",
  "LOG_DEBUG_TAGS" : true,
  "USE_TRANSCRIPTION" : false,
  "USE_HYPERLINKING" : false,
  "USE_GRAMMAR" : false,
  "USE_INTENT_CAPTURE" : false,
  "USE_CUSTOM_MODELS" : true,
  "CUSTOM_MODEL_DIR" : "/bin/altamodels/",
  "SAFEMODE" : false
}`;

      let fsObj = {
        '/README.txt': { content: 'You are accessing your A.L.T.A. in developer mode. I sure hope you know what you are doing. Try not to break anything!', canModify: true },
        '/home': { },
        '/logs': { },
        '/etc/alta/safemode/conf': { content: altaConfigContent, canModify: false },
        '/home/.altaconfig': { content: altaConfigOverrides, canModify: false },
        '/bin/altamodels/basic_grammar.ling': { content: 'UNREADABLE', canModify: false },
        '/bin/altamodels/intent_capture.ling': { content: 'UNREADABLE', canModify: false },
        '/bin/altamodels/intent_enhanced_grammar.ling': { content: 'UNREADABLE', canModify: false }
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
        let i_str = i + '';
        i_str = i_str.padStart(4, '0');
        fsObj['/logs/log_' + i_str] = { content: logs['log_' + i_str + '_pre'] + logs['log_' + i_str]}
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
> ls: List the contents of the current working directory. Run with a directory name to list its contents. Run with -a to list files and directories normally hidden from this command, or with --almost-all to leave out links to the current directory and parent directory.
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
            output: createNormOutRecord(helpOutput)
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

            const fileContent = file.get('content');
            if (fileContent === 'UNREADABLE') {
              return OutputFactory.makeErrorOutput(err);
            }
            else if (fileContent.length > 7 && fileContent.substring(4, 7) === 'LOG') {
              const filePre = fileContent.substring(0, 94);
              const logText = fileContent.substring(94);
              return createCatLogRecord(filePre, logText);
            }
            else {
              return createNormOutRecord(fileContent);
            }
          };
          if (opts.length === 0) {
            return {};
          }

          const cwd = EnvironmentVariables.getEnvironmentVariable(state.getEnvVariables(), 'cwd');
          // Getting cwd env variable does not append a '/' if not at root, so need to append it.
          const path = cwd === '/' ? cwd : cwd + '/';

          return {
            outputs: opts.map(filename => fileToTextOutput(state.getFileSystem(), path + filename))
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
            [NORMOUT_TYPE]: NormOutput,
            [ART_TYPE]: ArtOutput,
            [CATLOG_TYPE]: CatLogOutput
          }}
          theme={{
            ...ReactThemes.hacker, 
            height: '100vh', 
            spacing: '0',
            fontSize: '1rem',
            fontFamily: 'Ubuntu Mono, monospace'
          }}
          promptSymbol=">"
          clickToFocus
          className="term" />
      </div>
    );
  }
}

export default App;
