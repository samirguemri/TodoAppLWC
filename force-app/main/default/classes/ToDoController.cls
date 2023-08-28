public with sharing class ToDoController {

    @AuraEnabled
    public static Id saveTask(String task, Date dueDate){
        try {
            ToDo__c todo = new ToDo__c();
            todo.Task__c = task;
            todo.Due_Date__c = dueDate;
            insert todo;
            return todo.Id;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}