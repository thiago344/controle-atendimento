import { Button } from '@mui/material';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const dataAtual = new Date();
  const prefixoSenha = '' + dataAtual.getFullYear() + (dataAtual.getMonth() + 1) + dataAtual.getDate();

  const [filaPrioritaria, setFilaPrioritaria] = useState([]);
  const [filaExame, setFilaExame] = useState([]);
  const [filaGeral, setFilaGeral] = useState([]);
  const [filaHistorico, setFilaHistorico]= useState([]);

  const [ordemPrioritario, setOrdemPrioritario] = useState(1);
  const [ordemExame, setOrdemExame] = useState(1);
  const [ordemGeral, setOrdemGeral] = useState(1);

  const [chamarPrioridade, setChamarPrioridade] = useState(true);
  const [senhaAtualChamada, setSenhaAtualChamada] = useState('');

  useEffect(() => {
  
  }); 


  const solicitaSenhaPrioritaria = (e) => {
    let filaAtualizada = [...filaPrioritaria]; // Cria uma nova cópia da filaPrioritaria
    let ordem = ordemPrioritario;
    let senhaGerada = prefixoSenha + 'SP' + ordem;
    filaAtualizada.push(senhaGerada);
    setFilaPrioritaria(filaAtualizada);
    ordem++;
    setOrdemPrioritario(ordem);
  };

  const solicitaSenhaExame = (e) => {
    let filaAtualizada = [...filaExame]; // Cria uma nova cópia da filaExame
    let ordem = ordemExame;
    let senhaGerada = prefixoSenha + 'SE' + ordem;
    filaAtualizada.push(senhaGerada);
    setFilaExame(filaAtualizada);
    ordem++;
    setOrdemExame(ordem);
  };

  const solicitaSenhaGeral = (e) => {
    let filaAtualizada = [...filaGeral]; // Cria uma nova cópia da filaGeral
    let ordem = ordemGeral;
    let senhaGerada = prefixoSenha + 'SG' + ordem;
    filaAtualizada.push(senhaGerada);
    setFilaGeral(filaAtualizada);
    ordem++;
    setOrdemGeral(ordem);
  };

  const chamarProximaSenha = (e) => {

    let prioridade = chamarPrioridade;
    //Verificação se é única lista a imprimir
    if( filaPrioritaria.length>0  && (filaExame.length===0  && filaGeral.length===0) ){
      prioridade= true;
    }else if (filaPrioritaria.length===0  && (filaExame.length>0  || filaGeral.length>0)) {
      prioridade = false;
    }


    if (  prioridade && filaPrioritaria.length>0   ) {
      let filaPrioritariaAuxiliar = [...filaPrioritaria];
      let senha = senhaAtualChamada;
      senha = filaPrioritariaAuxiliar.shift();
      setSenhaAtualChamada(senha);
      let filaHistoricoAuxiliar = [...filaHistorico];
      filaHistoricoAuxiliar.push(senha);
      setFilaHistorico(filaHistoricoAuxiliar);
      setFilaPrioritaria(filaPrioritariaAuxiliar);
      setChamarPrioridade(false);
    } else if (!prioridade && filaExame.length > 0) {
      let filaExameAuxiliar = [...filaExame];
      let senha = filaExameAuxiliar.shift();
      setSenhaAtualChamada(senha);
      let filaHistoricoAuxiliar = [...filaHistorico];
      filaHistoricoAuxiliar.push(senha);
      setFilaHistorico(filaHistoricoAuxiliar);
      setFilaExame(filaExameAuxiliar);
      setChamarPrioridade(true);
    }else if (!prioridade && filaGeral.length > 0) {
      let filaGeralAuxiliar = [...filaGeral];
      let senha = filaGeralAuxiliar.shift();
      setSenhaAtualChamada(senha);
      let filaHistoricoAuxiliar = [...filaHistorico];
      filaHistoricoAuxiliar.push(senha);
      setFilaHistorico(filaHistoricoAuxiliar);
      setFilaGeral(filaGeralAuxiliar);
      setChamarPrioridade(true);
    }

  };

  return (
    <div className="App">
      <div>
        <h1>Retire aqui sua senha</h1>
        <Button variant="contained" onClick={solicitaSenhaPrioritaria}>Senha prioritária</Button>
        <Button variant="contained" onClick={solicitaSenhaExame}>Senha Exame</Button>
        <Button variant="contained" onClick={solicitaSenhaGeral}>Senha Geral</Button>
      </div>
      <div className="fila-container">
        <div className="fila">
          <h3>Senhas na fila Prioritária:</h3>
          <ul>
            {filaPrioritaria.map((senha, index) => (
              <li key={index}>{senha}</li>
            ))}
          </ul>
        </div>
        <div className="fila">
          <h3>Senhas na fila Exame:</h3>
          <ul>
            {filaExame.map((senha, index) => (
              <li key={index}>{senha}</li>
            ))}
          </ul>
        </div>
        <div className="fila">
          <h3>Senhas na fila Geral:</h3>
          <ul>
            {filaGeral.map((senha, index) => (
              <li key={index}>{senha}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Button variant="contained" onClick={chamarProximaSenha}>Chamar próxima senha</Button>
      </div>
      <div>
      <div className="fila">
          <h3>Histórico de senhas chamadas:</h3>
          <ul>
            {filaHistorico.map((senha, index) => (
              <li key={index}>{senha}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
