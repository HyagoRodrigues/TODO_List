package Methods;

import Objects.Task;

import java.util.*;

public class Methods {
    static List<Task> tasks = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public Methods() {
        this.tasks = new ArrayList<>();
    }

    public static void add_task() {
        System.out.println("Digite o nome da tarefa: ");
        String name = sc.nextLine();
        System.out.println("Digite a descrição da tarefa: ");
        String description = sc.nextLine();
        System.out.println("Digite a data de vencimento da tarefa: ");
        String dueDate = sc.nextLine();
        System.out.println("Digite a categoria da tarefa: ");
        String category = sc.nextLine();
        System.out.println("Digite o status da tarefa: ");
        String status = sc.nextLine();
        System.out.println("Digite a prioridade da tarefa: ");
        int priority = Integer.parseInt(sc.nextLine());
        Task task = new Task(name, description, dueDate, priority, category, status);
        tasks.add(task);
        sort_by_priority();
        System.out.println("Tarefa adicionada com sucesso!");
    }

    //Ordenando tarefas pelo nível de prioridade
    public static void sort_by_priority() {
        tasks.sort((task1, task2) -> {
            return Integer.compare(task1.getPriority(), task2.getPriority());
        });
    }



    //Listando as tarefas
    public static void list_tasks() {
        for (Task task : tasks) {
            System.out.println("Nome da Tarefa: " + task.getName());
            System.out.println("Descrição: " + task.getDescription());
            System.out.println("Data de Vencimento: " + task.getDueDate());
            System.out.println("Prioridade: " + task.getPriority());
            System.out.println("Categoria: " + task.getCategory());
            System.out.println("Status: " + task.getStatus());
            System.out.println("----------------");
        }
    }

    //Deletando Tarefas
    public static void delete_task() {
        System.out.println("Digite o nome da tarefa que deseja deletar: ");
        String name = sc.nextLine();
        for (Task task : tasks) {

            if(task.getName() == null){
                System.out.println("Tarefa não encontrada!");
            } else if (task.getName().equals(name)) {
                tasks.remove(task);
                System.out.println("Tarefa deletada com sucesso!");
            }

        }
    }


    //Listar por Categoria
    public static void list_by_category() {
        System.out.println("Digite a categoria que deseja listar: ");
        String category = sc.nextLine();
        for (Task task : tasks) {
            if (task.getCategory().equals(category)) {
                System.out.println("Nome da Tarefa: " + task.getName());
                System.out.println("Descrição: " + task.getDescription());
                System.out.println("Data de Vencimento: " + task.getDueDate());
                System.out.println("Prioridade: " + task.getPriority());
                System.out.println("Categoria: " + task.getCategory());
                System.out.println("Status: " + task.getStatus());
                System.out.println("----------------");
            }
        }
    }

    //Listar por Status
    public static void list_by_status() {
        System.out.println("Digite o status que deseja listar: ");
        String status = sc.nextLine();
        for (Task task : tasks) {
            if (task.getStatus().equals(status)) {
                System.out.println("Nome da Tarefa: " + task.getName());
                System.out.println("Descrição: " + task.getDescription());
                System.out.println("Data de Vencimento: " + task.getDueDate());
                System.out.println("Prioridade: " + task.getPriority());
                System.out.println("Categoria: " + task.getCategory());
                System.out.println("Status: " + task.getStatus());
                System.out.println("----------------");
            }
        }
    }

    //Listar por Prioridade
    public static void list_by_priority() {
        System.out.println("Digite a prioridade que deseja listar: ");
        int priority = sc.nextInt();
        for (Task task : tasks) {
            if (task.getPriority() >= priority) {
                System.out.println("Nome da Tarefa: " + task.getName());
                System.out.println("Descrição: " + task.getDescription());
                System.out.println("Data de Vencimento: " + task.getDueDate());
                System.out.println("Prioridade: " + task.getPriority());
                System.out.println("Categoria: " + task.getCategory());
                System.out.println("Status: " + task.getStatus());
                System.out.println("----------------");
            }
        }
    }


    public static void update_task() {
        System.out.println("Digite o nome da tarefa que deseja atualizar: ");
        String name = sc.nextLine();
        for(Task task : tasks) {
            if(task.getName().equals(name)) {
                System.out.println("Digite a nova descrição da tarefa: ");
                String description = sc.nextLine();
                System.out.println("Digite a nova data de vencimento da tarefa: ");
                String dueDate = sc.nextLine();
                System.out.println("Digite a nova categoria da tarefa: ");
                String category = sc.nextLine();
                System.out.println("Digite o novo status da tarefa: ");
                String status = sc.nextLine();
                System.out.println("Digite a nova prioridade da tarefa: ");
                int priority = Integer.parseInt(sc.nextLine());
                task.setDescription(description);
                task.setDueDate(dueDate);
                task.setCategory(category);
                task.setStatus(status);
                task.setPriority(priority);
                System.out.println("Tarefa atualizada com sucesso!");
            }
        }
    }

}
