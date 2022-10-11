class ToDoItem {
    constructor(name) {
        this.name = name;
        this.details = [];
    }
}

class Detail {
    constructor(name) {
        this.name = name;
    }
}

class ToDoService {
    static toDoItems = [];

    static getAllToDoItems() {
      return this.toDoItems;
    }

    static getToDoItem(id) {
      return this.toDoItems[id];
    }

    static createToDoItem(toDoItem) {
      return this.toDoItems.push(toDoItem);
    }

    static updateToDoItem(id, newToDoItem) {
      return this.toDoItems[id] = newToDoItem;
    }

    static deleteToDoItem(id) {
      return this.toDoItems.splice(id, 1);
    }
}

class DOMManager {
    static toDoItems;

    static getAllToDoItems() {
      this.render(ToDoService.getAllToDoItems());
    }

    static createToDoItem(name) {
      ToDoService.createToDoItem(new ToDoItem(name));
      this.render(ToDoService.getAllToDoItems());
    }

    static deleteToDoItem(id) {
      ToDoService.deleteToDoItem(id);
      this.render(ToDoService.getAllToDoItems());
    }

    static addDetail(id) {
      for (let toDoItem of this.toDoItems) {
        if (this.toDoItems.indexOf(toDoItem) == id) {
          toDoItem.details.push(new Detail($(`#${this.toDoItems.indexOf(toDoItem)}-detail-name`).val()));
          ToDoService.updateToDoItem(id, toDoItem);
          this.render(ToDoService.getAllToDoItems());
        }
      }
    }

    static deleteDetail(toDoItemID, detailID) {
      for (let toDoItem of this.toDoItems) {
              if (this.toDoItems.indexOf(toDoItem) == toDoItemID) {
                for (let detail of toDoItem.details) {
                  if (toDoItem.details.indexOf(detail) == detailID) {
                    toDoItem.details.splice(toDoItem.details.indexOf(detail), 1);
                    ToDoService.updateToDoItem(toDoItemID, toDoItem);
                    this.render(ToDoService.getAllToDoItems());
                  }
                }
              }
          }
    }

    static render(toDoItems) {
        this.toDoItems = toDoItems;
        $('#to-do-items').empty();
        for (let toDoItem of this.toDoItems) {
            $('#to-do-items').prepend(
                `<div id="${this.toDoItems.indexOf(toDoItem)}" class="card">
                    <div class="card-header">
                    <h2>${toDoItem.name}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deleteToDoItem('${this.toDoItems.indexOf(toDoItem)}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${this.toDoItems.indexOf(toDoItem)}-detail-name" class="form-control" placeholder="Details">
                                </div>
                                <button id="${this.toDoItems.indexOf(toDoItem)}-new-detail" onclick="DOMManager.addDetail('${this.toDoItems.indexOf(toDoItem)}')" class="btn btn-primary form-control">Add Detail</button>
                            </div>
                         </div>
                    </div>
                </div><br>`
            );
            for (let detail of toDoItem.details) {
                $(`#${this.toDoItems.indexOf(toDoItem)}`).find('.card-body').append(
                    `<p>
                      <span id="name-${toDoItem.details.indexOf(detail)}"><strong>Detail:</strong> ${detail.name}</span> - 
                      <button class="btn btn-danger" onclick="DOMManager.deleteDetail('${this.toDoItems.indexOf(toDoItem)}','${toDoItem.details.indexOf(detail)}')">Delete Detail</button>
                    </p>`
                );
            }
        }
    }
}

$('#create-new-to-do').click(() => {
    DOMManager.createToDoItem($('#new-to-do-name').val());
    $('#new-to-do-name').val('');
});

DOMManager.getAllToDoItems();