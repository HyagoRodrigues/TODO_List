package Main;

import Methods.Methods;
import java.util.*;

public class App {

    public static void main(String[] args) {


        Scanner sc = new Scanner(System.in);
        boolean exit = false;
        while(!exit){
            System.out.println("Olá seja bem vindo ao sistema de tarefas!");
            System.out.println("\nDigite a opção desejada: \n1 - Adicionar uma tarefa \n2 - Deletar uma tarefa \n3 - Listar tarefas \n4 - Listar tarefas por categoria \n5 - Listar tarefas por status \n6 - Listar tarefas por prioridade \n7 - Sair");
            int option = sc.nextInt();
            switch(option){
                case 1:
                    Methods.add_task();
                    break;
                case 2:
                    Methods.delete_task();
                    break;
                case 3:
                    Methods.list_tasks();
                    break;
                case 4:
                    Methods.list_by_category();
                    break;
                case 5:
                    Methods.list_by_status();
                    break;
                case 6:
                    Methods.list_by_priority();
                    break;
                case 7:
                    exit = true;
                    break;
                default:
                    System.out.println("Opção inválida!");
                    break;
            }
        }


    }

}
